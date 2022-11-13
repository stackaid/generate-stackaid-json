import * as core from '@actions/core'
import { DependencyConfig, PackageJson, StackAidJson } from './types/index.js'
import { FileTypes } from './constants.js'
import { generators } from './generate.js'
import { getClient } from './queries.js'
import { isFileType } from './utils.js'

export { generators } from './generate.js'

export const getDependencies = async (
  config: DependencyConfig,
  generatorTypes?: Partial<typeof generators>
) => {
  const { owner, repo, octokit } = config
  const packageJson: PackageJson[] = []
  const stackAidJson: StackAidJson = { version: 1, dependencies: [] }

  const client = getClient(octokit)
  const summary = await client.getRepositorySummary(owner, repo, '**/')
  const generate = { ...generators, ...generatorTypes }
  for (const {
    after,
    node: { filename },
  } of summary) {
    switch (true) {
      case isFileType(filename, FileTypes.go): {
        core.info(`Found ${filename}, getting Go dependencies`)
        const deps = await generate.go({ ...config, filename })
        stackAidJson.dependencies.push(...deps)
        break
      }
      case isFileType(filename, FileTypes.javascript): {
        core.info(`Found ${filename}, copying dependencies`)
        const deps = await generate.javascript({ ...config, filename })
        packageJson.push(deps)
        break
      }
      default:
        const deps = await generate.graph({ ...config, after })
        stackAidJson.dependencies.push(...deps)
        break
    }
  }

  return stackAidJson.dependencies.length
    ? { stackAidJson, packageJson }
    : { packageJson }
}
