import { CreateCommitOnBranchInput } from './types/graphql.js';
import { Octokit } from 'octokit';
export declare const summaryFragment: import("graphql").DocumentNode;
export declare const repositoryFragment: import("graphql").DocumentNode;
export declare const getClient: (octokit: Octokit) => {
    graphql(query: string, variables?: Record<string, any>): Promise<any>;
    getFileContents(owner: string, repo: string, path: string): Promise<string | null>;
    getRepositorySummaryPage(owner: string, repo: string, cursor?: string): Promise<{
        cursor: string;
        node: {
            id: string;
            filename: string;
        };
    }[]>;
    getRepositorySummary(owner: string, repo: string, glob?: string): Promise<{
        after: string | undefined;
        cursor: string;
        node: {
            id: string;
            filename: string;
        };
    }[]>;
    getRepositoryDependencies(owner: string, repo: string, first?: number, after?: string): Promise<{
        packageManager: string;
        requirements: string;
        packageName: string;
        hasDependencies: boolean;
        repository: {
            name: string;
            url: any;
            owner: {
                login: string;
            } | {
                login: string;
            };
        };
    }[]>;
    getHeadOid(owner: string, repo: string): Promise<{
        name: string;
        oid: any;
    }>;
    createCommit(owner: string, repo: string, input: Partial<CreateCommitOnBranchInput>): Promise<{
        commit: {
            url: any;
        };
    }>;
};
