import lodash from 'lodash'
import path from 'path'
import { GITHUB_DOMAIN } from './constants.js'
import { StackAidDependency } from './types/index.js'
import { execSync } from 'child_process'

const { uniqBy } = lodash
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
  const [url, version = ''] = m.split('@') as [string, string]
  const [domain, owner, repo] = url.split('/')

  return { module: [domain, owner, repo].join('/'), version }
}

export const listDirectDeps = (dir: string, sourceDir: string) => {
  let output = execSync(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: path.resolve(sourceDir, dir), maxBuffer: 1024 * 1024 * 10 }
  ).toString()

  return output
    .split('\n')
    .map((d) => {
      const [module, version = ''] = d.split(' ') as [string]
      return { module, version }
    })
    .filter((entry) => filterDependency(entry.module))
}

export const getModuleGraph = (dir: string, sourceDir: string) => {
  const output = execSync(`go mod graph`, {
    cwd: path.resolve(sourceDir, dir),
    maxBuffer: 1024 * 1024 * 10,
  }).toString()

  const graph: Record<string, { module: string; version: string }[]> = {}

  output.split('\n').forEach((line) => {
    if (!line) {
      return
    }

    const [parent, child] = line.split(' ') as [string, string]
    const mod = parseModuleUrl(parent)
    const childMod = parseModuleUrl(child)

    const key = `${mod.module}@${mod.version}`
    graph[key] = graph[key] || []

    if (childMod.module !== key) {
      graph[key]!.push(childMod)
    }
  })

  Object.entries(graph).forEach(([key, deps]) => {
    graph[key] = uniqBy(deps, 'module')
  })

  return graph
}

export const getDependencies = (
  dir: string = '',
  sourceDir: string = process.cwd()
) => {
  const graph = getModuleGraph(dir, sourceDir)
  const direct = listDirectDeps(dir, sourceDir)

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
