interface StackAidDependency {
  source: string
  dependencies?: StackAidDependency[]
}

interface StackAidJson {
  version: number
  dependencies: StackAidDependency[]
}

interface GoModule {
  Path: string
  Dir: string
  Version: string
}
