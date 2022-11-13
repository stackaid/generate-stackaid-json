import { DependencyConfig, PackageJson, StackAidJson } from './types/index.js';
import { generators } from './generate.js';
export { generators } from './generate.js';
export declare const getDependencies: (config: DependencyConfig, generatorTypes?: Partial<typeof generators>) => Promise<{
    stackAidJson: StackAidJson;
    packageJson: PackageJson[];
} | {
    packageJson: PackageJson[];
    stackAidJson?: undefined;
}>;
