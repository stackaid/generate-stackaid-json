"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generators = void 0;
const go = __importStar(require("./go.js"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const constants_js_1 = require("./constants.js");
const queries_js_1 = require("./queries.js");
const { uniqBy } = lodash_1.default;
const getJavaScriptDependencies = ({ octokit, owner, repo, filename, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield (0, queries_js_1.getClient)(octokit).getFileContents(owner, repo, filename);
        const { dependencies, devDependencies } = JSON.parse(content);
        return { filename, dependencies, devDependencies };
    }
    catch (error) {
        // File may not exist or not be valid JSON
        return null;
    }
});
const getGoDependencies = ({ owner, repo, filename, sourceDir, }) => __awaiter(void 0, void 0, void 0, function* () {
    const parent = `https://${constants_js_1.GITHUB_DOMAIN}/${owner}/${repo}`;
    const deps = go
        .getDependencies(path_1.default.dirname(filename), sourceDir)
        .filter(({ source }) => source !== parent);
    return deps;
});
const getDependencyGraph = ({ octokit, owner, repo, after, }) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, queries_js_1.getClient)(octokit);
    const dependencies = [];
    const results = yield client.getRepositoryDependencies(owner, repo, 1, after);
    const direct = uniqBy(results, (d) => d.repository.url);
    for (const dep of direct) {
        const { url: source, name, owner: { login: owner }, } = dep.repository;
        const summary = yield client.getRepositorySummary(owner, name);
        console.log(`${owner}/${name}: ${summary.map((s) => s.node.filename)}`);
        let indirect = [];
        for (const { after } of summary) {
            const deps = yield client.getRepositoryDependencies(owner, name, 1, after);
            indirect.push(...deps.map((d) => ({ source: d.repository.url })));
        }
        // Dependencies shouldn't be funding themselves.
        indirect = indirect.filter((d) => d.source !== source);
        dependencies.push({ source, dependencies: uniqBy(indirect, 'source') });
    }
    return dependencies;
});
exports.generators = {
    go: getGoDependencies,
    javascript: getJavaScriptDependencies,
    graph: getDependencyGraph,
};
