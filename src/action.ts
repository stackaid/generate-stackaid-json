import * as core from '@actions/core'
import { FileAddition } from './types/graphql.js'
import { Octokit } from 'octokit'
import { addFileChange, isSamePublishRepo, publishFiles } from './github.js'
import { getDependencies } from './index.js'

export const sourceDir = core.getInput('src_dir') || process.cwd()

const run = async () => {
  const owner = process.env.GITHUB_REPOSITORY_OWNER as string
  const repo = process.env.GITHUB_REPOSITORY?.split('/', 2)[1] as string
  const token = core.getInput('token')
  const octokit = new Octokit({ auth: token })

  const { stackAidJson, packageJson } = await getDependencies({
    owner,
    repo,
    octokit,
    sourceDir,
  })

  // Make file available to subsequent actions
  core.setOutput('stackaid_json', stackAidJson)

  // Create list of files for commit
  const files: FileAddition[] = []
  if (stackAidJson && stackAidJson.dependencies.length > 0) {
    files.push(
      addFileChange('stackaid.json', JSON.stringify(stackAidJson, null, 2))
    )
  }

  const includePackageJson = core.getBooleanInput('include_package_json')
  if (includePackageJson && !isSamePublishRepo) {
    // Read each file and only pull out relevant fields
    files.push(
      ...packageJson.map(({ filename, ...contents }) => {
        return addFileChange(filename, JSON.stringify(contents, null, 2))
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
      octokit,
      `Update stackaid dependencies for ${owner}/${repo}`,
      files
    )
  }
}

run()
