import { Octokit } from 'octokit'

export interface DependencyConfig {
  octokit: Octokit
  owner: string
  repo: string
  filename?: string
  sourceDir?: string
}

export interface GraphConfig {
  octokit: Octokit
  owner: string
  repo: string
  after?: string
}

export interface PackageJson {
  filename: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export interface StackAidDependency {
  source: string
  dependencies?: StackAidDependency[]
}

export interface StackAidJson {
  version: 1 // Only allowed version for the time being
  dependencies: StackAidDependency[]
}

export interface GoModule {
  Path: string
  Dir: string
  Version: string
}
