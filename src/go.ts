import path from 'path'
import { GITHUB_DOMAIN } from './constants'
import { execSync } from 'child_process'
import { sourceDir } from './github'
import { uniqBy } from 'lodash'

const resolveDir = (dir: string) => path.resolve(sourceDir, dir)

const filterDependency = (line: string) => line.startsWith(GITHUB_DOMAIN)

const parseDependency = (line: string) => {
  switch (true) {
    case line.startsWith(GITHUB_DOMAIN):
      const [domain, owner, repo] = line.split('/')
      return `https://${domain}/${owner}/${repo}`
    default:
      return
  }
}

const parseModuleUrl = (m: string) => {
  const [url, version = ''] = m.split('@')
  const [domain, owner, repo] = url.split('/')

  return { module: [domain, owner, repo].join('/'), version }
}

export const listDirectDeps = (dir: string) => {
  let output = execSync(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: resolveDir(dir) }
  ).toString()

  return output
    .split('\n')
    .map((d) => {
      const [module, version = ''] = d.split(' ')
      return { module, version }
    })
    .filter((entry) => filterDependency(entry.module))
}

export const getModuleGraph = (dir: string) => {
  const output = execSync(`go mod graph`, {
    cwd: resolveDir(dir),
  }).toString()

  const graph: Record<string, { module: string; version: string }[]> = {}

  output.split('\n').forEach((line) => {
    if (!line) {
      return
    }

    const [parent, child] = line.split(' ')
    const mod = parseModuleUrl(parent)
    const childMod = parseModuleUrl(child)

    const key = `${mod.module}@${mod.version}`
    graph[key] = graph[key] || []

    if (childMod.module !== key) {
      graph[key].push(childMod)
    }
  })

  Object.entries(graph).forEach(([key, deps]) => {
    graph[key] = uniqBy(deps, 'module')
  })

  return graph
}

export const getDependencies = (dir: string = '') => {
  const graph = getModuleGraph(dir)
  const direct = listDirectDeps(dir)

  let dependencies = direct
    .filter((d) => filterDependency(d.module))
    .map((d) => {
      const url = parseModuleUrl(d.module).module
      const deps = graph[`${url}@${d.version}`] || []
      return {
        source: parseDependency(d.module) as string,
        dependencies: deps
          .filter((d) => filterDependency(d.module))
          .map((d) => ({
            source: parseDependency(d.module) as string,
          })),
      }
    })

  return dependencies as StackAidDependency[]
}
