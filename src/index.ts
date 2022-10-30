import * as core from '@actions/core'
import path from 'path'
import { FileTypes, GITHUB_DOMAIN } from './constants'
import { getClient } from './queries'
import { getDependencies as getGoDependencies } from './go'
import { isFileType } from './utils'
import { readFileSync } from 'fs'
import { uniqBy } from 'lodash'

export interface DependencyConfig {
  owner: string
  repo: string
  token: string
  sourceDir?: string
}

export const getDependencies = async (config: DependencyConfig) => {
  const { owner, repo, token, sourceDir } = config
  const packageJson: PackageJson[] = []
  const stackAidJson: StackAidJson = { version: 1, dependencies: [] }
  let direct = []

  const client = getClient(token)
  const summary = await client.getRepositorySummary(owner, repo, '**/')
  for (const {
    after,
    node: { filename },
  } of summary) {
    switch (true) {
      case isFileType(filename, FileTypes.go): {
        core.info(`Found ${filename}, getting Go dependencies`)
        const parent = `https://${GITHUB_DOMAIN}/${owner}/${repo}`
        const deps = getGoDependencies(
          path.dirname(filename),
          sourceDir
        ).filter(({ source }) => source !== parent)
        stackAidJson.dependencies.push(...deps)
        break
      }
      case isFileType(filename, FileTypes.javascript): {
        core.info(`Found ${filename}, copying dependencies`)
        const { dependencies, devDependencies } = JSON.parse(
          readFileSync(path.resolve(sourceDir!, filename), 'utf8')
        )
        packageJson.push({ filename, dependencies, devDependencies })
      }
      default:
        direct.push(
          ...(await client.getRepositoryDependencies(owner, repo, 1, after))
        )
        break
    }
  }

  // We need to query each direct dependency separately since the graphql API
  // does NOT support nested dependencies.
  direct = uniqBy(direct, (d) => d.repository.url)
  for (const dep of direct) {
    const {
      url: source,
      name,
      owner: { login: owner },
    } = dep.repository
    const summary = await client.getRepositorySummary(owner, name)
    core.info(`${owner}/${name}: ${summary.map((s) => s.node.filename)}`)

    let indirect: StackAidDependency[] = []
    for (const { after } of summary) {
      const deps = await client.getRepositoryDependencies(owner, name, 1, after)
      indirect.push(...deps.map((d) => ({ source: d.repository.url })))
    }

    // Dependencies shouldn't be funding themselves.
    indirect = indirect.filter((d) => d.source !== source)
    stackAidJson.dependencies.push({
      source,
      dependencies: uniqBy(indirect, 'source'),
    })
  }

  return { stackAidJson, packageJson }
}
