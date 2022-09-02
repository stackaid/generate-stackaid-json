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

export const listDeps = (dir: string, module: string = '') => {
  let output = execSync(`go list -f {{.Deps}} ${module}`, {
    cwd: resolveDir(dir),
  }).toString()
  // trim `[]` at start and end of string
  output = output.slice(1, -1)

  const deps = output.split(/\s+/).filter((d) => d.startsWith(GITHUB_DOMAIN))
  return deps
}

export const listModules = (dir: string) => {
  core.info(`listModules ${resolveDir(dir)}`)

  const output = execSync(
    'go list -m -f \'{{if not (or .Indirect .Main)}}{{ `{"Path": "` }}{{.Path}}{{ `", "Dir": "` }}{{.Dir}}{{ `", "Version": "` }}{{.Version}}{{ `"}` }}{{end}}\' all',
    { cwd: resolveDir(dir) }
  ).toString()

  const modules: GoModule[] = output
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))

  return modules
}

export const ensureModules = (dir: string) => {
  core.info('ensureModules')
  // List direct dependency modules
  let modules = listModules(dir)

  // Download modules for each dependency missing a Dir
  downloadModules(
    modules.filter((m) => !m.Dir),
    dir
  )

  // Get dependency info again
  modules = listModules(dir)

  return modules
}

export const downloadModules = (modules: GoModule[], dir: string) => {
  modules.forEach((m) =>
    execSync(`go mod download ${m.Path}@${m.Version}`, { cwd: resolveDir(dir) })
  )
}

export const getDependencies = (dir: string = '') => {
  const direct = listDeps(dir)
  const dependencies = direct.map((source) => ({
    source,
    dependencies: listDeps(dir, source).map((source) => ({ source })),
  }))

  return dependencies as StackAidDependency[]
}
