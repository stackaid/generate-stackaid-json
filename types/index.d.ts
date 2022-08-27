interface StackAidDependency {
  source: string
  dependencies?: StackAidDependency[]
}

interface StackAidJson {
  version: number
  dependencies: StackAidDependency[]
}
