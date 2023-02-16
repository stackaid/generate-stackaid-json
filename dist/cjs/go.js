"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencies = exports.getModuleGraph = exports.listDirectDeps = void 0;
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const constants_js_1 = require("./constants.js");
const child_process_1 = require("child_process");
const { uniqBy } = lodash_1.default;
const filterDependency = (line) => line.startsWith(constants_js_1.GITHUB_DOMAIN);
const parseDependency = (line) => {
    switch (true) {
        case line.startsWith(constants_js_1.GITHUB_DOMAIN):
            const [domain, owner, repo] = line.split('/');
            return `https://${domain}/${owner}/${repo}`;
        default:
            return;
    }
};
const parseModuleUrl = (m) => {
    const [url, version = ''] = m.split('@');
    const [domain, owner, repo] = url.split('/');
    return { module: [domain, owner, repo].join('/'), version };
};
const listDirectDeps = (dir, sourceDir) => {
    let output = (0, child_process_1.execSync)(`go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`, { cwd: path_1.default.resolve(sourceDir, dir), maxBuffer: 1024 * 1024 * 10 }).toString();
    return output
        .split('\n')
        .map((d) => {
        const [module, version = ''] = d.split(' ');
        return { module, version };
    })
        .filter((entry) => filterDependency(entry.module));
};
exports.listDirectDeps = listDirectDeps;
const getModuleGraph = (dir, sourceDir) => {
    const output = (0, child_process_1.execSync)(`go mod graph`, {
        cwd: path_1.default.resolve(sourceDir, dir),
        maxBuffer: 1024 * 1024 * 10,
    }).toString();
    const graph = {};
    output.split('\n').forEach((line) => {
        if (!line) {
            return;
        }
        const [parent, child] = line.split(' ');
        const mod = parseModuleUrl(parent);
        const childMod = parseModuleUrl(child);
        const key = `${mod.module}@${mod.version}`;
        graph[key] = graph[key] || [];
        if (childMod.module !== key) {
            graph[key].push(childMod);
        }
    });
    Object.entries(graph).forEach(([key, deps]) => {
        graph[key] = uniqBy(deps, 'module');
    });
    return graph;
};
exports.getModuleGraph = getModuleGraph;
const getDependencies = (dir = '', sourceDir = process.cwd()) => {
    const graph = (0, exports.getModuleGraph)(dir, sourceDir);
    const direct = (0, exports.listDirectDeps)(dir, sourceDir);
    let dependencies = direct
        .filter((d) => filterDependency(d.module))
        .map((d) => {
        const url = parseModuleUrl(d.module).module;
        const deps = graph[`${url}@${d.version}`] || [];
        return {
            source: parseDependency(d.module),
            dependencies: deps
                .filter((d) => filterDependency(d.module))
                .map((d) => ({
                source: parseDependency(d.module),
            })),
        };
    });
    return dependencies;
};
exports.getDependencies = getDependencies;
