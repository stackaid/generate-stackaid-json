"use strict";
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
exports.getClient = exports.repositoryFragment = exports.summaryFragment = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constants_js_1 = require("./constants.js");
const graphql_tag_1 = require("graphql-tag");
const utils_js_1 = require("./utils.js");
const graphql_1 = require("graphql");
const { uniqBy } = lodash_1.default;
exports.summaryFragment = (0, graphql_tag_1.gql)(`
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
exports.repositoryFragment = (0, graphql_tag_1.gql)(`
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
const getClient = (octokit) => {
    return {
        graphql(query, variables) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield octokit.graphql(Object.assign(Object.assign({}, variables), { query, headers: {
                        // Required for dependency graph queries, see:
                        // https://docs.github.com/en/graphql/overview/schema-previews#access-to-a-repositories-dependency-graph-preview
                        Accept: 'application/vnd.github.hawkgirl-preview+json',
                    }, request: { timeout: 60 * 1000 } }));
                return result;
            });
        },
        getFileContents(owner, repo, path) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield octokit.rest.repos.getContent({
                    owner,
                    repo,
                    path,
                });
                if ((res === null || res === void 0 ? void 0 : res.status) !== 200) {
                    return null;
                }
                const encodedContent = res.data.content;
                return Buffer.from(encodedContent, 'base64').toString();
            });
        },
        getRepositorySummaryPage(owner, repo, cursor = '') {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = (yield this.graphql(`
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
          ${(0, graphql_1.print)(exports.summaryFragment)}
        `, { repo, owner, cursor }));
                    const { dependencyGraphManifests: { edges }, } = result.repository;
                    return edges;
                }
                catch (e) {
                    // Typically happens when repo cannot be found
                    console.log(e);
                    return [];
                }
            });
        },
        getRepositorySummary(owner, repo, glob = '') {
            return __awaiter(this, void 0, void 0, function* () {
                let edges = yield this.getRepositorySummaryPage(owner, repo);
                if (!edges.length) {
                    return [];
                }
                let { cursor } = edges[edges.length - 1];
                while (cursor) {
                    edges = [
                        ...edges,
                        ...(yield this.getRepositorySummaryPage(owner, repo, cursor)),
                    ];
                    const next = edges[edges.length - 1].cursor;
                    cursor = next !== cursor ? next : '';
                }
                const relevant = edges
                    .map((edge, i) => (Object.assign(Object.assign({}, edge), { after: i > 0 ? edges[i - 1].cursor : undefined })))
                    .filter((edge) => (0, utils_js_1.matches)(edge.node.filename, constants_js_1.SUMMARY_FILE_TYPES, glob));
                return relevant;
            });
        },
        getRepositoryDependencies(owner, repo, first, after) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = (yield this.graphql(`
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
          ${(0, graphql_1.print)(exports.repositoryFragment)}
        `, { repo, owner, first, after }));
                const { dependencyGraphManifests: { nodes }, } = result.repository;
                const dependencies = uniqBy(nodes
                    .filter((n) => (0, utils_js_1.matches)(n.filename, constants_js_1.DEPENDENCY_FILE_TYPES))
                    .flatMap((n) => n.dependencies.nodes)
                    .filter((d) => { var _a; return (_a = d.repository) === null || _a === void 0 ? void 0 : _a.url; }), (d) => d.repository.url);
                return dependencies;
            });
        },
        getHeadOid(owner, repo) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = (yield this.graphql(`
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
        `, { owner, repo }));
                const { name, target } = result.repository.defaultBranchRef;
                return { name, oid: target.history.nodes[0].oid };
            });
        },
        createCommit(owner, repo, input) {
            return __awaiter(this, void 0, void 0, function* () {
                const { name: branchName, oid } = yield this.getHeadOid(owner, repo);
                const result = (yield this.graphql(`
          mutation createCommit($input: CreateCommitOnBranchInput!) {
            createCommitOnBranch(input: $input) {
              commit {
                url
              }
            }
          }
        `, {
                    input: Object.assign({ branch: {
                            repositoryNameWithOwner: `${owner}/${repo}`,
                            branchName,
                        }, expectedHeadOid: oid }, input),
                }));
                return result.createCommitOnBranch;
            });
        },
    };
};
exports.getClient = getClient;
