import * as core from '@actions/core'
import * as github from '@actions/github'
import type { GraphQlQueryResponseData } from '@octokit/graphql'
import {
  DefaultBranchRef,
  DependencyEdge,
  Repository,
  RepositorySummary,
} from './types'
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
  // JavaScript
  'package.json',
  // Python
  'pipfile',
  'pyproject.toml',
  'requirements.txt',
  'setup.py',
  // Ruby
  'gemfile',
]

export const summaryFragment = `
  dependencyGraphManifests (dependenciesFirst: 1, withDependencies: true) {
    edges	{
      cursor
      node {
        id
        filename
      }
    }
  }
`

export const repositoryFragment = `
  dependencyGraphManifests (dependenciesFirst: 1, withDependencies: true, first: $first, after: $after) {
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
`

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
  })

  return result as any
}

export const getRepositorySummary = async (owner: string, repo: string) => {
  const result: GraphQlQueryResponseData = await graphql(
    `
    query getDependencyGraph($owner: String!, $repo: String!){
      repository(owner:$owner, name:$repo) {
        ${summaryFragment}
      }
    }
    `,
    { repo, owner }
  )

  const {
    dependencyGraphManifests: { edges },
  } = result.repository as RepositorySummary

  const relevant: DependencyEdge[] = []
  edges.forEach((edge, i) => {
    if (ALLOWED_FILENAMES.includes(edge.node.filename.toLowerCase())) {
      relevant.push({
        ...edge,
        after: i > 0 ? edges[i - 1].cursor : undefined,
      })
    }
  })

  return relevant
}

export const getRepositoryDependencies = async (
  owner: string,
  repo: string,
  first?: number,
  after?: string
) => {
  const result: GraphQlQueryResponseData = await graphql(
    `
    query getDependencyGraph($owner: String!, $repo: String!, $first: Int, $after: String) {
      repository(owner:$owner, name:$repo) {
        ${repositoryFragment}
      }
    }
    `,
    { repo, owner, first, after }
  )

  const {
    dependencyGraphManifests: { nodes },
  } = result.repository as Repository

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
  const result = await graphql(
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
  )
  const {
    defaultBranchRef: {
      name,
      target: {
        history: { nodes },
      },
    },
  } = result.repository as DefaultBranchRef

  return { name, oid: nodes[0].oid }
}

export const createCommit = async (owner: string, repo: string, input: any) => {
  const { name: branchName, oid } = await getHeadOid(owner, repo)

  core.info(
    `Publishing commit to ${owner}/${repo} branch: ${branchName} head: ${oid}`
  )
  core.info(JSON.stringify(input, null, 2))

  const result = await graphql(
    `
      mutation ($input: CreateCommitOnBranchInput!) {
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
    }
  )

  return result
}
