export interface GitTree {
    type: 'tree';
    name: string;
    path: string;
    children: GitRepository;
}

export interface GitBlob {
    type: 'blob';
    name: string;
    path: string;
}

export type GitItem = GitTree | GitBlob;

export interface GitRepository {
    [key: string]: GitItem;
}
