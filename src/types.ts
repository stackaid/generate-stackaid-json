export interface StackAidDependency {
  source: string
  dependencies?: StackAidDependency[]
}

export interface StackAidJson {
  version: number
  dependencies: StackAidDependency[]
}

export interface DependencyEdge {
  cursor: string
  node: {
    id: string
    filename: string
  }
  after?: string
}

export interface RepositorySummary {
  dependencyGraphManifests: {
    edges: DependencyEdge[]
  }
}

export interface DependencyDetail {
  repository: {
    name: string
    owner: {
      login: string
    }
    url: string
  }
  packageManager: string
  requirements: string
  packageName: string
  hasDependencies: boolean
}

export interface Repository {
  dependencyGraphManifests: {
    nodes: {
      filename: string
      dependencies: {
        nodes: DependencyDetail[]
      }
    }[]
  }
}

export interface DefaultBranchRef {
  defaultBranchRef: {
    name: string
    target: {
      history: {
        nodes: {
          oid: string
        }[]
      }
    }
  }
}
