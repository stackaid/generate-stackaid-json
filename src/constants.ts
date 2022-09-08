export const GITHUB_DOMAIN = 'github.com'

export const FileTypes = {
  go: ['go.mod'],
  java: ['pom.xml'],
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
