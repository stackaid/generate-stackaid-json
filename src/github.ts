import * as core from '@actions/core'
import { context } from '@actions/github'
import { FileAddition } from '../types/graphql'
import { createCommit } from './queries'

export const sourceDir = core.getInput('src_dir') || process.cwd()

export const isSamePublishRepo =
  core.getInput('publish_repo').toLowerCase() ===
  `${context.repo.owner.toLowerCase()}/${context.repo.repo.toLowerCase()}`

export const publishFiles = async (message: string, files: FileAddition[]) => {
  const [publishOwner, publishRepo] = core
    .getInput('publish_repo')
    .split('/', 2)

  await createCommit(publishOwner, publishRepo, {
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

  return {
    path,
    contents: Buffer.from(contents).toString('base64'),
  }
}
