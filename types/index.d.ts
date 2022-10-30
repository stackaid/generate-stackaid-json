interface PackageJson {
  filename: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

interface StackAidDependency {
  source: string
  dependencies?: StackAidDependency[]
}

interface StackAidJson {
  version: 1 // Only allowed version for the time being
  dependencies: StackAidDependency[]
}

interface GoModule {
  Path: string
  Dir: string
  Version: string
}
