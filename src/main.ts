import * as core from '@actions/core'
import path from 'path'
import { FileTypes, GITHUB_DOMAIN } from './constants'
import {
  addFileChange,
  isSamePublishRepo,
  publishFiles,
  sourceDir,
} from './github'
import { getDependencies } from './go'
import { getRepositoryDependencies, getRepositorySummary } from './queries'
import { matches } from './utils'
import { readFileSync } from 'fs'
import { uniqBy } from 'lodash'
import { FileAddition } from '../types/graphql'

const run = async () => {
  const owner = process.env.GITHUB_REPOSITORY_OWNER as string
  const repo = process.env.GITHUB_REPOSITORY?.split('/', 2)[1] as string

  const packageJson: string[] = []
  const stackAidJson: StackAidJson = { version: 1, dependencies: [] }
  let direct = []

  const glob = '**/'
  const summary = await getRepositorySummary(owner, repo, glob)
  for (const { after, node } of summary) {
    switch (true) {
      case matches(node.filename, FileTypes.go, glob): {
        core.info(`Found ${node.filename}, getting Go dependencies`)
        const parent = `https://${GITHUB_DOMAIN}/${owner}/${repo}`
        const deps = getDependencies(path.dirname(node.filename)).filter(
          ({ source }) => source !== parent
        )
        stackAidJson.dependencies.push(...deps)
        break
      }
      case matches(node.filename, FileTypes.javascript, glob): {
        core.info(`Found ${node.filename}, copying dependencies`)
        packageJson.push(node.filename)
      }
      default:
        direct.push(...(await getRepositoryDependencies(owner, repo, 1, after)))
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
    const summary = await getRepositorySummary(owner, name)
    core.info(`${owner}/${name}: ${summary.map((s) => s.node.filename)}`)

    let indirect: StackAidDependency[] = []
    for (const { after } of summary) {
      const deps = await getRepositoryDependencies(owner, name, 1, after)
      indirect.push(...deps.map((d) => ({ source: d.repository.url })))
    }

    // Dependencies shouldn't be funding themselves.
    indirect = indirect.filter((d) => d.source !== source)
    stackAidJson.dependencies.push({
      source,
      dependencies: uniqBy(indirect, 'source'),
    })
  }

  // Make file available to subsequent actions
  core.setOutput('stackaid_json', stackAidJson)

  // Create list of files for commit
  const files: FileAddition[] = []
  if (stackAidJson.dependencies.length > 0) {
    addFileChange('stackaid.json', JSON.stringify(stackAidJson, null, 2))
  }

  const includePackageJson = core.getBooleanInput('include_package_json')
  if (includePackageJson && !isSamePublishRepo) {
    // Read each file and only pull out relevant fields
    files.push(
      ...packageJson.map((filename) => {
        const { name, dependencies, devDependencies } = JSON.parse(
          readFileSync(path.resolve(sourceDir, filename), 'utf8')
        )
        return addFileChange(
          filename,
          JSON.stringify({ name, dependencies, devDependencies }, null, 2)
        )
      })
    )
  }

  core.debug(`Files to be published`)
  core.debug(JSON.stringify(files, null, 2))

  const skipPublish = core.getBooleanInput('skip_publish')
  if (skipPublish) {
    core.info('Skipping publish of generated stackaid dependencies')
  } else {
    await publishFiles(
      `Update stackaid dependencies for ${owner}/${repo}`,
      files
    )
  }
}

run()
