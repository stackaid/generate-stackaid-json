interface DependencyConfig {
    owner: string;
    repo: string;
    token: string;
    sourceDir?: string;
}
declare const getDependencies: (config: DependencyConfig) => Promise<{
    stackAidJson: StackAidJson;
    packageJson: PackageJson[];
}>;

export { DependencyConfig, getDependencies };
