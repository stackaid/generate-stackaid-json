import { execSync } from 'child_process'

export const listModules = (cwd: string) => {
  console.log('listModules', cwd)
  // List direct dependency modules
  const output = execSync(
    'go list -m -f \'{{if not (or .Indirect .Main)}}{{ `{"Path": "` }}{{.Path}}{{ `", "Dir": "` }}{{.Dir}}{{ `"}` }}{{end}}\' all',
    { cwd }
  ).toString()

  console.log('output', output)

  const modules = output
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
  return modules as { Path: string; Dir: string }[]
}

export const getDependencies = (dir: string = process.cwd()) => {
  const modules = listModules(dir)
  const dependencies = modules.map((m) => {
    const { Path: source, Dir: dir } = m
    const dependencies = dir
      ? listModules(dir).map((m) => ({ source: m.Path }))
      : []

    return { source, dependencies }
  })

  return dependencies as StackAidDependency[]
}
