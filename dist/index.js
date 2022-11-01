"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getDependencies: () => getDependencies2
});
module.exports = __toCommonJS(src_exports);
var core = __toESM(require("@actions/core"));
var import_path2 = __toESM(require("path"));

// src/constants.ts
var GITHUB_DOMAIN = "github.com";
var FileTypes = {
  go: ["go.mod"],
  java: ["pom.xml"],
  javascript: ["package.json"],
  php: ["composer.json"],
  python: ["pipfile", "pyproject.toml", "setup.py"],
  ruby: ["gemfile"],
  rust: ["cargo.toml"]
};
var SUMMARY_FILE_TYPES = Object.values(FileTypes).flat();
var DEPENDENCY_FILE_TYPES = [
  FileTypes.java,
  FileTypes.php,
  FileTypes.python,
  FileTypes.ruby,
  FileTypes.rust
].flat();

// src/queries.ts
var github = __toESM(require("@actions/github"));
var import_graphql_tag = __toESM(require("graphql-tag"));

// src/utils.ts
var import_minimatch = __toESM(require("minimatch"));
var matches = (file, fileTypes, glob = "") => (0, import_minimatch.default)(file.toLowerCase(), `${glob}*(${fileTypes.join("|")})`);
var isFileType = (filename, fileType) => matches(filename, fileType, "**/");

// src/queries.ts
var import_graphql = require("graphql");
var import_lodash = require("lodash");
var summaryFragment = (0, import_graphql_tag.default)(`
  fragment summaryFragment on DependencyGraphManifestConnection {
    edges	{
      cursor
      node {
        id
        filename
      }
    }
  }
`);
var repositoryFragment = (0, import_graphql_tag.default)(`
  fragment repositoryFragment on DependencyGraphManifestConnection {
    nodes {
      filename
      dependencies {
        nodes {
          repository {
            name
            owner {
              login
            }
            url
          }
          packageManager
          requirements
          packageName
          hasDependencies
        }
      }
    }
  }
`);
var getClient = (token) => {
  return {
    octokit: github.getOctokit(token),
    async graphql(query, variables) {
      const result = await this.octokit.graphql({
        ...variables,
        query,
        headers: {
          Accept: "application/vnd.github.hawkgirl-preview+json"
        },
        request: { timeout: 60 * 1e3 }
      });
      return result;
    },
    async getRepositorySummaryPage(owner, repo, cursor = "") {
      const result = await this.graphql(
        `
          query getRepositorySummary(
            $owner: String!
            $repo: String!
            $cursor: String
          ) {
            repository(owner: $owner, name: $repo) {
              dependencyGraphManifests(
                dependenciesFirst: 1
                withDependencies: true
                first: 100
                after: $cursor
              ) {
                ...summaryFragment
              }
            }
          }
          ${(0, import_graphql.print)(summaryFragment)}
        `,
        { repo, owner, cursor }
      );
      const {
        dependencyGraphManifests: { edges }
      } = result.repository;
      return edges;
    },
    async getRepositorySummary(owner, repo, glob = "") {
      let edges = await this.getRepositorySummaryPage(owner, repo);
      if (!edges.length) {
        return [];
      }
      let { cursor } = edges[edges.length - 1];
      while (cursor) {
        edges = [
          ...edges,
          ...await this.getRepositorySummaryPage(owner, repo, cursor)
        ];
        const next = edges[edges.length - 1].cursor;
        cursor = next !== cursor ? next : "";
      }
      const relevant = edges.map((edge, i) => ({
        ...edge,
        after: i > 0 ? edges[i - 1].cursor : void 0
      })).filter((edge) => matches(edge.node.filename, SUMMARY_FILE_TYPES, glob));
      return relevant;
    },
    async getRepositoryDependencies(owner, repo, first, after) {
      const result = await this.graphql(
        `
          query getRepositoryDependencies(
            $owner: String!
            $repo: String!
            $first: Int
            $after: String
          ) {
            repository(owner: $owner, name: $repo) {
              dependencyGraphManifests(
                dependenciesFirst: 1
                withDependencies: true
                first: $first
                after: $after
              ) {
                ...repositoryFragment
              }
            }
          }
          ${(0, import_graphql.print)(repositoryFragment)}
        `,
        { repo, owner, first, after }
      );
      const {
        dependencyGraphManifests: { nodes }
      } = result.repository;
      const dependencies = (0, import_lodash.uniqBy)(
        nodes.filter((n) => matches(n.filename, DEPENDENCY_FILE_TYPES)).flatMap((n) => n.dependencies.nodes).filter((d) => {
          var _a;
          return (_a = d.repository) == null ? void 0 : _a.url;
        }),
        (d) => d.repository.url
      );
      return dependencies;
    },
    async getHeadOid(owner, repo) {
      const result = await this.graphql(
        `
          query getHeadOid($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
              defaultBranchRef {
                name
                target {
                  ... on Commit {
                    history(first: 1) {
                      nodes {
                        oid
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        { owner, repo }
      );
      const { name, target } = result.repository.defaultBranchRef;
      return { name, oid: target.history.nodes[0].oid };
    },
    async createCommit(owner, repo, input) {
      const { name: branchName, oid } = await this.getHeadOid(owner, repo);
      const result = await this.graphql(
        `
          mutation createCommit($input: CreateCommitOnBranchInput!) {
            createCommitOnBranch(input: $input) {
              commit {
                url
              }
            }
          }
        `,
        {
          input: {
            branch: {
              repositoryNameWithOwner: `${owner}/${repo}`,
              branchName
            },
            expectedHeadOid: oid,
            ...input
          }
        }
      );
      return result.createCommitOnBranch;
    }
  };
};

// src/go.ts
var import_path = __toESM(require("path"));
var import_child_process = require("child_process");
var import_lodash2 = require("lodash");
var filterDependency = (line) => line.startsWith(GITHUB_DOMAIN);
var parseDependency = (line) => {
  switch (true) {
    case line.startsWith(GITHUB_DOMAIN):
      const [domain, owner, repo] = line.split("/");
      return `https://${domain}/${owner}/${repo}`;
    default:
      return;
  }
};
var parseModuleUrl = (m) => {
  const [url, version = ""] = m.split("@");
  const [domain, owner, repo] = url.split("/");
  return { module: [domain, owner, repo].join("/"), version };
};
var listDirectDeps = (dir, sourceDir) => {
  let output = (0, import_child_process.execSync)(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: import_path.default.resolve(sourceDir, dir) }
  ).toString();
  return output.split("\n").map((d) => {
    const [module2, version = ""] = d.split(" ");
    return { module: module2, version };
  }).filter((entry) => filterDependency(entry.module));
};
var getModuleGraph = (dir, sourceDir) => {
  const output = (0, import_child_process.execSync)(`go mod graph`, {
    cwd: import_path.default.resolve(sourceDir, dir)
  }).toString();
  const graph = {};
  output.split("\n").forEach((line) => {
    if (!line) {
      return;
    }
    const [parent, child] = line.split(" ");
    const mod = parseModuleUrl(parent);
    const childMod = parseModuleUrl(child);
    const key = `${mod.module}@${mod.version}`;
    graph[key] = graph[key] || [];
    if (childMod.module !== key) {
      graph[key].push(childMod);
    }
  });
  Object.entries(graph).forEach(([key, deps]) => {
    graph[key] = (0, import_lodash2.uniqBy)(deps, "module");
  });
  return graph;
};
var getDependencies = (dir = "", sourceDir = process.cwd()) => {
  const graph = getModuleGraph(dir, sourceDir);
  const direct = listDirectDeps(dir, sourceDir);
  let dependencies = direct.filter((d) => filterDependency(d.module)).map((d) => {
    const url = parseModuleUrl(d.module).module;
    const deps = graph[`${url}@${d.version}`] || [];
    return {
      source: parseDependency(d.module),
      dependencies: deps.filter((d2) => filterDependency(d2.module)).map((d2) => ({
        source: parseDependency(d2.module)
      }))
    };
  });
  return dependencies;
};

// src/index.ts
var import_fs = require("fs");
var import_lodash3 = require("lodash");
var getDependencies2 = async (config) => {
  const { owner, repo, token, sourceDir } = config;
  const packageJson = [];
  const stackAidJson = { version: 1, dependencies: [] };
  let direct = [];
  const client = getClient(token);
  const summary = await client.getRepositorySummary(owner, repo, "**/");
  for (const {
    after,
    node: { filename }
  } of summary) {
    switch (true) {
      case isFileType(filename, FileTypes.go): {
        core.info(`Found ${filename}, getting Go dependencies`);
        const parent = `https://${GITHUB_DOMAIN}/${owner}/${repo}`;
        const deps = getDependencies(
          import_path2.default.dirname(filename),
          sourceDir
        ).filter(({ source }) => source !== parent);
        stackAidJson.dependencies.push(...deps);
        break;
      }
      case isFileType(filename, FileTypes.javascript): {
        core.info(`Found ${filename}, copying dependencies`);
        const { dependencies, devDependencies } = JSON.parse(
          (0, import_fs.readFileSync)(import_path2.default.resolve(sourceDir, filename), "utf8")
        );
        packageJson.push({ filename, dependencies, devDependencies });
      }
      default:
        direct.push(
          ...await client.getRepositoryDependencies(owner, repo, 1, after)
        );
        break;
    }
  }
  direct = (0, import_lodash3.uniqBy)(direct, (d) => d.repository.url);
  for (const dep of direct) {
    const {
      url: source,
      name,
      owner: { login: owner2 }
    } = dep.repository;
    const summary2 = await client.getRepositorySummary(owner2, name);
    core.info(`${owner2}/${name}: ${summary2.map((s) => s.node.filename)}`);
    let indirect = [];
    for (const { after } of summary2) {
      const deps = await client.getRepositoryDependencies(owner2, name, 1, after);
      indirect.push(...deps.map((d) => ({ source: d.repository.url })));
    }
    indirect = indirect.filter((d) => d.source !== source);
    stackAidJson.dependencies.push({
      source,
      dependencies: (0, import_lodash3.uniqBy)(indirect, "source")
    });
  }
  return { stackAidJson, packageJson };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDependencies
});
//# sourceMappingURL=index.js.map