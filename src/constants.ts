export const GITHUB_DOMAIN = 'github.com'

export type Ecosystem =
  | 'go'
  | 'java'
  | 'javascript'
  | 'php'
  | 'python'
  | 'ruby'
  | 'rust'

export const FileTypes: Record<Ecosystem, string[]> = {
  go: ['go.mod'],
  java: ['pom.xml'],
  javascript: ['package.json'],
  php: ['composer.json'],
  python: ['pipfile', 'pyproject.toml', 'setup.py'],
  ruby: ['gemfile'],
  rust: ['cargo.toml'],
}

export const SUMMARY_FILE_TYPES = Object.values(FileTypes).flat()

export const DEPENDENCY_FILE_TYPES = [
  FileTypes.java,
  FileTypes.php,
  FileTypes.python,
  FileTypes.ruby,
  FileTypes.rust,
].flat()
