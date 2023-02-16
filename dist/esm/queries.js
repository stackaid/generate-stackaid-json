import lodash from 'lodash';
import { DEPENDENCY_FILE_TYPES, SUMMARY_FILE_TYPES } from './constants.js';
import { gql } from 'graphql-tag';
import { matches } from './utils.js';
import { print } from 'graphql';
const { uniqBy } = lodash;
export const summaryFragment = gql(`
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
export const repositoryFragment = gql(`
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
export const getClient = (octokit) => {
    return {
        async graphql(query, variables) {
            const result = await octokit.graphql({
                ...variables,
                query,
                headers: {
                    // Required for dependency graph queries, see:
                    // https://docs.github.com/en/graphql/overview/schema-previews#access-to-a-repositories-dependency-graph-preview
                    Accept: 'application/vnd.github.hawkgirl-preview+json',
                },
                request: { timeout: 60 * 1000 },
            });
            return result;
        },
        async getFileContents(owner, repo, path) {
            const res = await octokit.rest.repos.getContent({
                owner,
                repo,
                path,
            });
            if (res?.status !== 200) {
                return null;
            }
            const encodedContent = res.data.content;
            return Buffer.from(encodedContent, 'base64').toString();
        },
        async getRepositorySummaryPage(owner, repo, cursor = '') {
            try {
                const result = (await this.graphql(`
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
        `, { repo, owner, cursor }));
                const { dependencyGraphManifests: { edges }, } = result.repository;
                return edges;
            }
            catch (e) {
                // Typically happens when repo cannot be found
                console.log(e);
                return [];
            }
        },
        async getRepositorySummary(owner, repo, glob = '') {
            let edges = await this.getRepositorySummaryPage(owner, repo);
            if (!edges.length) {
                return [];
            }
            let { cursor } = edges[edges.length - 1];
            while (cursor) {
                edges = [
                    ...edges,
                    ...(await this.getRepositorySummaryPage(owner, repo, cursor)),
                ];
                const next = edges[edges.length - 1].cursor;
                cursor = next !== cursor ? next : '';
            }
            const relevant = edges
                .map((edge, i) => ({
                ...edge,
                after: i > 0 ? edges[i - 1].cursor : undefined,
            }))
                .filter((edge) => matches(edge.node.filename, SUMMARY_FILE_TYPES, glob));
            return relevant;
        },
        async getRepositoryDependencies(owner, repo, first, after) {
            const result = (await this.graphql(`
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
        `, { repo, owner, first, after }));
            const { dependencyGraphManifests: { nodes }, } = result.repository;
            const dependencies = uniqBy(nodes
                .filter((n) => matches(n.filename, DEPENDENCY_FILE_TYPES))
                .flatMap((n) => n.dependencies.nodes)
                .filter((d) => d.repository?.url), (d) => d.repository.url);
            return dependencies;
        },
        async getHeadOid(owner, repo) {
            const result = (await this.graphql(`
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
        },
        async createCommit(owner, repo, input) {
            const { name: branchName, oid } = await this.getHeadOid(owner, repo);
            const result = (await this.graphql(`
          mutation createCommit($input: CreateCommitOnBranchInput!) {
            createCommitOnBranch(input: $input) {
              commit {
                url
              }
            }
          }
        `, {
                input: {
                    branch: {
                        repositoryNameWithOwner: `${owner}/${repo}`,
                        branchName,
                    },
                    expectedHeadOid: oid,
                    ...input,
                },
            }));
            return result.createCommitOnBranch;
        },
    };
};
