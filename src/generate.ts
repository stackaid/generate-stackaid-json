import * as go from './go.js'
import lodash from 'lodash'
import path from 'path'
import { GITHUB_DOMAIN } from './constants.js'
import {
  DependencyConfig,
  GraphConfig,
  PackageJson,
  StackAidDependency,
} from './types/index.js'
import { getClient } from './queries.js'

const { uniqBy } = lodash

const getJavaScriptDependencies = async ({
  octokit,
  owner,
  repo,
  filename,
}: DependencyConfig) => {
  try {
    const content = await getClient(octokit).getFileContents(
      owner,
      repo,
      filename!
    )
    const { dependencies, devDependencies } = JSON.parse(content as string)
    return { filename, dependencies, devDependencies } as PackageJson
  } catch (error) {
    // File may not exist or not be valid JSON
    return null
  }
}

const getGoDependencies = async ({
  owner,
  repo,
  filename,
  sourceDir,
}: Omit<DependencyConfig, 'octokit'>) => {
  const parent = `https://${GITHUB_DOMAIN}/${owner}/${repo}`
  const deps = go
    .getDependencies(path.dirname(filename!), sourceDir)
    .filter(({ source }) => source !== parent)

  return deps as StackAidDependency[]
}

const getDependencyGraph = async ({
  octokit,
  owner,
  repo,
  after,
}: GraphConfig) => {
  const client = getClient(octokit)
  const dependencies: StackAidDependency[] = []
  const results = await client.getRepositoryDependencies(owner, repo, 1, after)
  const direct = uniqBy(results, (d) => d.repository.url)
  for (const dep of direct) {
    const {
      url: source,
      name,
      owner: { login: owner },
    } = dep.repository
    const summary = await client.getRepositorySummary(owner, name)
    console.log(`${owner}/${name}: ${summary.map((s) => s.node.filename)}`)

    let indirect: StackAidDependency[] = []
    for (const { after } of summary) {
      const deps = await client.getRepositoryDependencies(owner, name, 1, after)
      indirect.push(...deps.map((d) => ({ source: d.repository.url })))
    }

    // Dependencies shouldn't be funding themselves.
    indirect = indirect.filter((d) => d.source !== source)
    dependencies.push({ source, dependencies: uniqBy(indirect, 'source') })
  }

  return dependencies
}

export const generators = {
  go: getGoDependencies,
  javascript: getJavaScriptDependencies,
  graph: getDependencyGraph,
}
