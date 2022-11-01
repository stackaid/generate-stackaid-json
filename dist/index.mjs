// src/index.ts
import * as core from "@actions/core";
import path2 from "path";

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
import * as github from "@actions/github";
import gql from "graphql-tag";

// src/utils.ts
import minimatch from "minimatch";
var matches = (file, fileTypes, glob = "") => minimatch(file.toLowerCase(), `${glob}*(${fileTypes.join("|")})`);
var isFileType = (filename, fileType) => matches(filename, fileType, "**/");

// src/queries.ts
import { print } from "graphql";
import { uniqBy } from "lodash";
var summaryFragment = gql(`
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
var repositoryFragment = gql(`
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
          ${print(summaryFragment)}
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
          ${print(repositoryFragment)}
        `,
        { repo, owner, first, after }
      );
      const {
        dependencyGraphManifests: { nodes }
      } = result.repository;
      const dependencies = uniqBy(
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
import path from "path";
import { execSync } from "child_process";
import { uniqBy as uniqBy2 } from "lodash";
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
  let output = execSync(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: path.resolve(sourceDir, dir) }
  ).toString();
  return output.split("\n").map((d) => {
    const [module, version = ""] = d.split(" ");
    return { module, version };
  }).filter((entry) => filterDependency(entry.module));
};
var getModuleGraph = (dir, sourceDir) => {
  const output = execSync(`go mod graph`, {
    cwd: path.resolve(sourceDir, dir)
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
    graph[key] = uniqBy2(deps, "module");
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
import { readFileSync } from "fs";
import { uniqBy as uniqBy3 } from "lodash";
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
          path2.dirname(filename),
          sourceDir
        ).filter(({ source }) => source !== parent);
        stackAidJson.dependencies.push(...deps);
        break;
      }
      case isFileType(filename, FileTypes.javascript): {
        core.info(`Found ${filename}, copying dependencies`);
        const { dependencies, devDependencies } = JSON.parse(
          readFileSync(path2.resolve(sourceDir, filename), "utf8")
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
  direct = uniqBy3(direct, (d) => d.repository.url);
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
      dependencies: uniqBy3(indirect, "source")
    });
  }
  return { stackAidJson, packageJson };
};
export {
  getDependencies2 as getDependencies
};
//# sourceMappingURL=index.mjs.map