import * as core from '@actions/core'
import path from 'path'
import { execSync } from 'child_process'

const sourceDir = core.getInput('src_dir') || process.cwd()

const resolveDir = (dir: string) => path.resolve(sourceDir, dir)

export const listDir = (dir: string) => {
  core.info(`listDir ${resolveDir(dir)}`)
  const output = execSync('ls -lah', { cwd: resolveDir(dir) }).toString()
  return output
}

export const listModules = (dir: string) => {
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
  core.info(listDir(dir))
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
  const modules = ensureModules(dir)
  const dependencies = modules.map((m) => {
    const { Path: source, Dir: dir } = m
    const dependencies = dir
      ? listModules(dir).map((m) => ({ source: m.Path }))
      : []

    return { source, dependencies }
  })

  return dependencies as StackAidDependency[]
}
