import { StackAidDependency } from './types/index.js';
export declare const listDirectDeps: (dir: string, sourceDir: string) => {
    module: string;
    version: string;
}[];
export declare const getModuleGraph: (dir: string, sourceDir: string) => Record<string, {
    module: string;
    version: string;
}[]>;
export declare const getDependencies: (dir?: string, sourceDir?: string) => StackAidDependency[];
