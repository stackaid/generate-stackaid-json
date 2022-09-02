import * as core from '@actions/core'
import path from 'path'
import { execSync } from 'child_process'

const GITHUB_DOMAIN = 'github.com'

const sourceDir = core.getInput('src_dir') || process.cwd()

const resolveDir = (dir: string) => path.resolve(sourceDir, dir)

export const listDir = (dir: string) => {
  core.info(`listDir ${resolveDir(dir)}`)
  const output = execSync('ls -lah', { cwd: resolveDir(dir) }).toString()
  return output
}

const parseDependency = (line: string) => {
  switch (true) {
    case line.startsWith(GITHUB_DOMAIN):
      const [domain, owner, repo] = line.split('/')
      return `https://${domain}/${owner}/${repo}`
    default:
      return
  }
}

export const listDeps = (dir: string, module: string = '') => {
  let output = execSync(`go list -f {{.Deps}} ${module}`, {
    cwd: resolveDir(dir),
  }).toString()
  // trim `[]` at start and end of string
  output = output.slice(1, -1)

  return output.split(/\s+/).map(parseDependency).filter(Boolean)
}

export const getDependencies = (dir: string = '') => {
  const direct = listDeps(dir)
  const dependencies = direct.map((source) => ({
    source,
    dependencies: listDeps(dir, source).map((source) => ({ source })),
  }))

  return dependencies as StackAidDependency[]
}
