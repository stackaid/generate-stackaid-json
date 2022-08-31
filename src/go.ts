import { execSync } from 'child_process'

export const listModules = (cwd: string) => {
  const output = execSync(
    'go list -m -f \'{{if not (or .Indirect .Main)}}{{ `{"Path": "` }}{{.Path}}{{ `", "Dir": "` }}{{.Dir}}{{ `", "Version": "` }}{{.Version}}{{ `"}` }}{{end}}\' all',
    { cwd }
  ).toString()

  const modules: GoModule[] = output
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))

  return modules
}

export const ensureModules = (cwd: string) => {
  // List direct dependency modules
  let modules = listModules(cwd)

  // Download modules for each dependency missing a Dir
  downloadModules(modules.filter((m) => !m.Dir))

  // Get dependency info again
  modules = listModules(cwd)

  return modules
}

export const downloadModules = (modules: GoModule[]) => {
  modules.forEach((m) => execSync(`go mod download ${m.Path}@${m.Version}`))
}

export const getDependencies = (dir: string = process.cwd()) => {
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
