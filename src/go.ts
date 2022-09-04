import * as core from '@actions/core'
import path from 'path'
import { GITHUB_DOMAIN } from './constants'
import { execSync } from 'child_process'
import { groupBy, uniqBy } from 'lodash'

const sourceDir = core.getInput('src_dir') || process.cwd()

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

export const listDirectDeps = (dir: string) => {
  let output = execSync(
    `go list -f '{{if not .Indirect}}{{.}}{{end}}' -m all`,
    { cwd: resolveDir(dir) }
  ).toString()

  return output
    .split('\n')
    .map((d) => d.split(' ')[0])
    .filter(filterDependency)
}

export const listModuleDeps = (dir: string, module: string) => {
  let output: string = ''
  try {
    output = execSync(`go list -f {{.Deps}} ${module}`, {
      cwd: resolveDir(dir),
    }).toString()
    // trim `[]` at start and end of string
    output = output.slice(1, -1)
  } catch (e) {
    // Command may error if no required module actually provides this package
  }

  return output.split(/\s+/).filter(filterDependency)
}

export const getDependencies = (dir: string = '') => {
  const direct = listDirectDeps(dir)
  let dependencies = direct.map((d) => ({
    source: parseDependency(d),
    dependencies: listModuleDeps(dir, d).map((d) => ({
      source: parseDependency(d),
    })),
  }))

  // Merge direct dependencies with the same source
  // and remove self dependencies
  const groups = groupBy(dependencies, 'source')
  return Object.entries(groups).map(([source, group]) => {
    return {
      source,
      dependencies: uniqBy(
        group.flatMap((g) => g.dependencies),
        'source'
      ).filter((d) => d.source !== source),
    }
  }) as StackAidDependency[]
}
