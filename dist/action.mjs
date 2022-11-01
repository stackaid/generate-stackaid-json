// src/action.ts
import * as core3 from "@actions/core";

// src/github.ts
import * as core from "@actions/core";
import { context } from "@actions/github";

// src/queries.ts
import * as github from "@actions/github";
import gql from "graphql-tag";

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

// src/github.ts
var isSamePublishRepo = core.getInput("publish_repo").toLowerCase() === `${context.repo.owner.toLowerCase()}/${context.repo.repo.toLowerCase()}`;
var publishFiles = async (token, message, files) => {
  const [publishOwner, publishRepo] = core.getInput("publish_repo").split("/", 2);
  await getClient(token).createCommit(publishOwner, publishRepo, {
    message: {
      headline: message,
      body: ""
    },
    fileChanges: {
      additions: files,
      deletions: []
    }
  });
};
var addFileChange = (path3, contents) => {
  const publishPath = core.getInput("publish_path");
  if (publishPath) {
    path3 = `${publishPath}/${path3}`;
  }
  return { path: path3, contents: Buffer.from(contents).toString("base64") };
};

// src/index.ts
import * as core2 from "@actions/core";
import path2 from "path";

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
var listDirectDeps = (dir, sourceDir2) => {
  let output = execSync(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: path.resolve(sourceDir2, dir) }
  ).toString();
  return output.split("\n").map((d) => {
    const [module, version = ""] = d.split(" ");
    return { module, version };
  }).filter((entry) => filterDependency(entry.module));
};
var getModuleGraph = (dir, sourceDir2) => {
  const output = execSync(`go mod graph`, {
    cwd: path.resolve(sourceDir2, dir)
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
var getDependencies = (dir = "", sourceDir2 = process.cwd()) => {
  const graph = getModuleGraph(dir, sourceDir2);
  const direct = listDirectDeps(dir, sourceDir2);
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
  const { owner, repo, token, sourceDir: sourceDir2 } = config;
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
        core2.info(`Found ${filename}, getting Go dependencies`);
        const parent = `https://${GITHUB_DOMAIN}/${owner}/${repo}`;
        const deps = getDependencies(
          path2.dirname(filename),
          sourceDir2
        ).filter(({ source }) => source !== parent);
        stackAidJson.dependencies.push(...deps);
        break;
      }
      case isFileType(filename, FileTypes.javascript): {
        core2.info(`Found ${filename}, copying dependencies`);
        const { dependencies, devDependencies } = JSON.parse(
          readFileSync(path2.resolve(sourceDir2, filename), "utf8")
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
    core2.info(`${owner2}/${name}: ${summary2.map((s) => s.node.filename)}`);
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

// src/action.ts
var sourceDir = core3.getInput("src_dir") || process.cwd();
var run = async () => {
  var _a;
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  const repo = (_a = process.env.GITHUB_REPOSITORY) == null ? void 0 : _a.split("/", 2)[1];
  const token = core3.getInput("token");
  const { stackAidJson, packageJson } = await getDependencies2({
    owner,
    repo,
    token,
    sourceDir
  });
  core3.setOutput("stackaid_json", stackAidJson);
  const files = [];
  if (stackAidJson.dependencies.length > 0) {
    files.push(
      addFileChange("stackaid.json", JSON.stringify(stackAidJson, null, 2))
    );
  }
  const includePackageJson = core3.getBooleanInput("include_package_json");
  if (includePackageJson && !isSamePublishRepo) {
    files.push(
      ...packageJson.map(({ filename, ...contents }) => {
        return addFileChange(filename, JSON.stringify(contents, null, 2));
      })
    );
  }
  core3.debug(`Files to be published`);
  core3.debug(JSON.stringify(files, null, 2));
  const skipPublish = core3.getBooleanInput("skip_publish");
  if (skipPublish) {
    core3.info("Skipping publish of generated stackaid dependencies");
  } else {
    await publishFiles(
      token,
      `Update stackaid dependencies for ${owner}/${repo}`,
      files
    );
  }
};
run();
export {
  sourceDir
};
//# sourceMappingURL=action.mjs.map