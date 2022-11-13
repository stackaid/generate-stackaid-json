import * as core from '@actions/core'
import { FileAddition } from './types/graphql.js'
import { Octokit } from 'octokit'
import { context } from '@actions/github'
import { getClient } from './queries.js'

export const isSamePublishRepo =
  core.getInput('publish_repo').toLowerCase() ===
  `${context.repo.owner.toLowerCase()}/${context.repo.repo.toLowerCase()}`

export const publishFiles = async (
  octokit: Octokit,
  message: string,
  files: FileAddition[]
) => {
  const [publishOwner, publishRepo] = core
    .getInput('publish_repo')
    .split('/', 2) as [string, string]

  await getClient(octokit).createCommit(publishOwner, publishRepo, {
    message: {
      headline: message,
      body: '',
    },
    fileChanges: {
      additions: files,
      deletions: [],
    },
  })
}

export const addFileChange = (path: string, contents: string) => {
  const publishPath = core.getInput('publish_path')
  if (publishPath) {
    path = `${publishPath}/${path}`
  }

  return { path, contents: Buffer.from(contents).toString('base64') }
}
