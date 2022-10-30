import * as core from '@actions/core'
import { FileAddition } from '../types/graphql'
import { context } from '@actions/github'
import { getClient } from './queries'

export const isSamePublishRepo =
  core.getInput('publish_repo').toLowerCase() ===
  `${context.repo.owner.toLowerCase()}/${context.repo.repo.toLowerCase()}`

export const publishFiles = async (
  token: string,
  message: string,
  files: FileAddition[]
) => {
  const [publishOwner, publishRepo] = core
    .getInput('publish_repo')
    .split('/', 2)

  await getClient(token).createCommit(publishOwner, publishRepo, {
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
