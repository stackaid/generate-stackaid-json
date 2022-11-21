"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPENDENCY_FILE_TYPES = exports.SUMMARY_FILE_TYPES = exports.FileTypes = exports.GITHUB_DOMAIN = void 0;
exports.GITHUB_DOMAIN = 'github.com';
exports.FileTypes = {
    go: ['go.mod'],
    java: ['pom.xml'],
    javascript: ['package.json'],
    php: ['composer.json'],
    python: ['pipfile', 'pyproject.toml', 'setup.py'],
    ruby: ['gemfile'],
    rust: ['cargo.toml'],
};
exports.SUMMARY_FILE_TYPES = Object.values(exports.FileTypes).flat();
exports.DEPENDENCY_FILE_TYPES = [
    exports.FileTypes.java,
    exports.FileTypes.php,
    exports.FileTypes.python,
    exports.FileTypes.ruby,
    exports.FileTypes.rust,
].flat();
