import { DependencyConfig, GraphConfig, PackageJson, StackAidDependency } from './types/index.js';
export declare const generators: {
    go: ({ owner, repo, filename, sourceDir, }: Omit<DependencyConfig, 'octokit'>) => Promise<StackAidDependency[]>;
    javascript: ({ octokit, owner, repo, filename, }: DependencyConfig) => Promise<PackageJson | null>;
    graph: ({ octokit, owner, repo, after, }: GraphConfig) => Promise<StackAidDependency[]>;
};
