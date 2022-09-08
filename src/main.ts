import * as core from '@actions/core'
import path from 'path'
import { FileTypes, GITHUB_DOMAIN } from './constants'
import {
  createCommit,
  getRepositoryDependencies,
  getRepositorySummary,
} from './queries'
import { getDependencies } from './go'
import { matches } from './utils'
import { uniqBy } from 'lodash'

const run = async () => {
  const owner = process.env.GITHUB_REPOSITORY_OWNER as string
  const repo = process.env.GITHUB_REPOSITORY?.split('/', 2)[1] as string

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

  const skipPublish = core.getBooleanInput('skip_publish')
  if (skipPublish) {
    core.info('Skipping publish of generated stackaid.json')
    return
  }

  // Commit file to provided repo
  const [publishOwner, publishRepo] = core
    .getInput('publish_repo')
    .split('/', 2)

  let filePath = `stackaid.json`
  const publishPath = core.getInput('publish_path')
  if (publishPath) {
    filePath = `${publishPath}/${filePath}`
  }
  const fileContents = JSON.stringify(stackAidJson, null, 2)

  await createCommit(publishOwner, publishRepo, {
    message: {
      headline: `Update stackaid.json dependencies for ${owner}/${repo}`,
      body: '',
    },
    fileChanges: {
      additions: [
        {
          path: filePath,
          contents: Buffer.from(fileContents).toString('base64'),
        },
      ],
      deletions: [],
    },
  })
}

run()
