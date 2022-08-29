import * as core from '@actions/core'
import * as github from '@actions/github'
import gql from 'graphql-tag'
import {
  Commit,
  CreateCommitMutation,
  CreateCommitMutationVariables,
  CreateCommitOnBranchInput,
  GetHeadOidQuery,
  GetHeadOidQueryVariables,
  GetRepositoryDependenciesQuery,
  GetRepositoryDependenciesQueryVariables,
  GetRepositorySummaryQuery,
  GetRepositorySummaryQueryVariables,
} from '../types/graphql'
import { print } from 'graphql'
import { uniqBy } from 'lodash'

const ALLOWED_FILENAMES = [
  // Rust
  'cargo.toml',
  // PHP
  'composer.json',
  // Go
  'go.mod',
  // Java/Scala
  'pom.xml',
  // Python
  'pipfile',
  'pyproject.toml',
  'requirements.txt',
  'setup.py',
  // Ruby
  'gemfile',
]

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
`)

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
`)

export const graphql = async (
  query: string,
  variables?: Record<string, any>
) => {
  const token = core.getInput('token')
  const octokit = github.getOctokit(token)
  const result = await octokit.graphql({
    ...variables,
    query,
    headers: {
      // Required for dependency graph queries, see:
      // https://docs.github.com/en/graphql/overview/schema-previews#access-to-a-repositories-dependency-graph-preview
      Accept: 'application/vnd.github.hawkgirl-preview+json',
    },
    request: { timeout: 60 * 1000 },
  })

  return result as any
}

const getRepositorySummaryPage = async (
  owner: string,
  repo: string,
  cursor: string = ''
) => {
  const result = (await graphql(
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
    { repo, owner, cursor } as GetRepositorySummaryQueryVariables
  )) as GetRepositorySummaryQuery

  const {
    dependencyGraphManifests: { edges },
  } = result.repository

  return edges
}

export const getRepositorySummary = async (owner: string, repo: string) => {
  let edges = await getRepositorySummaryPage(owner, repo)
  if (!edges.length) {
    return []
  }

  let { cursor } = edges[edges.length - 1]
  while (cursor) {
    edges = [...edges, ...(await getRepositorySummaryPage(owner, repo, cursor))]
    const next = edges[edges.length - 1].cursor
    cursor = next !== cursor ? next : ''
  }

  const relevant = edges
    .filter((edge) =>
      ALLOWED_FILENAMES.includes(edge.node.filename.toLowerCase())
    )
    .map((edge, i) => ({
      ...edge,
      after: i > 0 ? edges[i - 1].cursor : undefined,
    }))

  return relevant
}

export const getRepositoryDependencies = async (
  owner: string,
  repo: string,
  first?: number,
  after?: string
) => {
  const result = (await graphql(
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
    { repo, owner, first, after } as GetRepositoryDependenciesQueryVariables
  )) as GetRepositoryDependenciesQuery

  const {
    dependencyGraphManifests: { nodes },
  } = result.repository

  const dependencies = uniqBy(
    nodes
      .filter((n) => ALLOWED_FILENAMES.includes(n.filename.toLowerCase()))
      .flatMap((n) => n.dependencies.nodes)
      .filter((d) => d.repository?.url),
    (d) => d.repository.url
  )

  return dependencies
}

export const getHeadOid = async (owner: string, repo: string) => {
  const result = (await graphql(
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
    { owner, repo } as GetHeadOidQueryVariables
  )) as GetHeadOidQuery

  const { name, target } = result.repository.defaultBranchRef
  return { name, oid: (target as Commit).history.nodes[0].oid }
}

export const createCommit = async (
  owner: string,
  repo: string,
  input: Partial<CreateCommitOnBranchInput>
) => {
  const { name: branchName, oid } = await getHeadOid(owner, repo)
  const result = (await graphql(
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
          branchName,
        },
        expectedHeadOid: oid,
        ...input,
      },
    } as CreateCommitMutationVariables
  )) as CreateCommitMutation

  return result.createCommitOnBranch
}
