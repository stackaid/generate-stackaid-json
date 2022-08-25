import * as core from '@actions/core'
import { uniqBy } from 'lodash'
import {
  createCommit,
  getRepositoryDependencies,
  getRepositorySummary,
} from './queries'
import { StackAidDependency, StackAidJson } from './types'

const run = async () => {
  const stackAidJson: StackAidJson = { version: 1, dependencies: [] }

  const owner = process.env.GITHUB_REPOSITORY_OWNER as string
  const repo = process.env.GITHUB_REPOSITORY?.split('/', 2)[1] as string
  const direct = await getRepositoryDependencies(owner, repo)

  core.info(
    `Debugging inputs ${core.getBooleanInput('skip_publish')} ${core.getInput(
      'skip_publish'
    )}`
  )

  core.info(`Found ${direct.length} direct dependencies`)

  // We need to query each direct dependency separately since the graphql API
  // does NOT support nested dependencies.
  for (const dep of direct) {
    const {
      url: source,
      name,
      owner: { login: owner },
    } = dep.repository
    // First get summmary to filter to relevant files
    const summary = await getRepositorySummary(owner, name)
    core.info(`${owner}/${name}: ${summary.map((s) => s.node.filename)}`)

    const indirect: StackAidDependency[] = []
    for (const { after } of summary) {
      const deps = await getRepositoryDependencies(owner, name, 1, after)
      indirect.push(...deps.map((d) => ({ source: d.repository.url })))
    }

    stackAidJson.dependencies.push({
      source,
      dependencies: uniqBy(indirect, 'source'),
    })
  }

  // Make file available to subsequent actions
  core.setOutput('stackaid_json', stackAidJson)

  const skipPublish = core.getBooleanInput('skip_publish')
  if (!skipPublish) {
    core.info('Skipping publish of generated stackaid.json')
    return
  }

  // Commit file to provided repo
  const [publishOwner, publishRepo] = core
    .getInput('publish_repo')
    .split('/', 2)
  const publishPath = core.getInput('publish_path')

  const filePath = `${publishPath}/${repo}/stackaid.json`
  const fileContents = JSON.stringify(stackAidJson, null, 2)

  await createCommit(publishOwner, publishRepo, {
    message: {
      headline: `Update stackaid.json dependencies for ${owner}/${repo}`,
    },
    fileChanges: {
      additions: [
        {
          path: filePath,
          contents: Buffer.from(fileContents).toString('base64'),
        },
      ],
    },
  })
}

run()
