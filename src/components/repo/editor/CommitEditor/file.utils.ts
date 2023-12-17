import { FileEditorData, FileEditorRoute, FileExtension, FilePermission, FileSchemaType } from './types';
import { GitItem, GitRepository, GitTree } from '../../gitolite.types';

export function toFileExtensionEnum(ext: string) {
    switch (ext) {
        case 'json':
            return FileExtension.JSON;
        case 'md':
            return FileExtension.MARKDOWN;
        case 'txt':
            return FileExtension.TEXT;
        case 'ipynb':
            return FileExtension.NOTEBOOK;
        case 'py':
            return FileExtension.PYTHON;
    }
}

export function toFileSchematicsType({
    fileType,
    folders,
    filename,
}: {
    fileType?: FileExtension;
    folders: string[];
    filename?: string;
}) {
    const firstFolder = folders?.[0] || '';
    const secondFolder = folders?.[1] || '';

    const isNoFolder = folders.length < 1;

    switch (true) {
        // case isFirstFolder: // WTF? it doesnt work!
        case firstFolder === 'simulations':
            return FileSchemaType.SIMULATIONS;
        case firstFolder === 'workflows':
            return FileSchemaType.WORKFLOWS;
        case firstFolder === 'parameter_setups' && secondFolder == 'functions':
            return FileSchemaType.FUNCTIONS;
        case firstFolder === 'parameter_setups':
            return FileSchemaType.PARAMETER_SETUPS;
        case firstFolder === 'notebooks':
            return FileSchemaType.NOTEBOOKS;

        // case isNoFolder: // WTF? it doesnt work!
        case isNoFolder && filename?.includes('settings'):
            return FileSchemaType.SETTINGS;
    }
}

export function getFileExtension(filepath: string[]) {
    const lastPart = filepath[filepath.length - 1];
    const parts = lastPart?.split('.');
    if (parts && parts.length > 1) {
        return parts[parts.length - 1];
    }
}

export function getFolders(filepath: string[]) {
    const lastItem = filepath[filepath.length - 1];
    if (lastItem && !lastItem.includes('.')) {
        return filepath;
    }
    return filepath.slice(0, -1);
}

export function getIsFolder(tree: GitRepository, filepath: string[]): boolean {
    const key = filepath.join('/');

    if (!key) return true;

    const gitItems = flattenGitRepository(tree);

    const item = gitItems.find((item) => item.path === key);

    return item?.type === 'tree';
}

export interface Lol {
    fileType?: FileExtension;
    schemaType?: FileSchemaType;
    permission: FilePermission;
}

export function getTest({ folders, filename, ext }: { ext?: string; folders: string[]; filename?: string }) {
    const isFirstFolder = folders.length === 1;
    const firstFolder = folders?.[0];

    const isNoFolder = folders.length < 1;

    switch (true) {
        case isFirstFolder:
        case firstFolder === 'simulations':
            return;
        case firstFolder === 'workflows':
            return FileSchemaType.WORKFLOWS;
        case firstFolder === 'parameter_setups':
            return FileSchemaType.PARAMETER_SETUPS;
        case isNoFolder:
        case filename?.includes('settings'):
            return FileSchemaType.SETTINGS;
    }

    return {
        permission: 'READ',
    };
}

const savedTypes = {
    'simulations.json': {
        schemaType: FileSchemaType.SIMULATIONS,
        fileType: FileExtension.JSON,
        permission: 'READ',
    },
    simulations: {
        schemaType: FileSchemaType.SIMULATIONS,
        fileType: FileExtension.JSON,
        permission: 'READ',
    },
};

export function getChildGitTree(folders: string[], tree: GitRepository): GitRepository {
    let current: GitRepository = tree;

    for (const folder of folders) {
        const item = current[folder];
        if (item && item.type === 'tree') current = item.children;
    }

    return current;
}

export function flattenGitRepository(repository: GitRepository): GitItem[] {
    const result: GitItem[] = [];

    function flattenTree(tree: GitTree, currentPath: string) {
        result.push({ ...tree });

        for (const key in tree.children) {
            const child = tree.children[key];
            const childPath = `${currentPath}/${key}`;

            if (child.type === 'blob') {
                result.push({ ...child });
            } else if (child.type === 'tree') {
                flattenTree(child, childPath);
            }
        }
    }

    for (const key in repository) {
        const item = repository[key];
        const itemPath = key;

        if (item.type === 'blob') {
            result.push({ ...item });
        } else if (item.type === 'tree') {
            flattenTree(item, itemPath);
        }
    }

    return result;
}

export function findFileInFolder(filename: string, gitRepository: GitRepository, filePath?: string[]) {
    const childGitTree = getChildGitTree(filePath || [], gitRepository);    
    const flatten = flattenGitRepository(childGitTree);
    const fullFilePath = filePath && filePath.length > 0? filePath + `/${filename}`: filename;
    return flatten.find((value) => value.type === 'blob' && value.path?.toLowerCase() === fullFilePath.toLowerCase());
}

export function findFilesInFolder(gitRepository: GitRepository, filePath?: string[]) {
    const childGitTree = getChildGitTree(filePath || [], gitRepository);
    const flatten = flattenGitRepository(childGitTree);

    return flatten.filter((value) => {
        return value.type === 'blob'
    })
}

export function generateFileKey({ repoName, branch, filePath }: FileEditorRoute) {
    return `${repoName}/${branch}/${filePath.join('/')}`;
}

export function toFileDataStringValue(fileData: FileEditorData): string {
    if (typeof fileData === 'object') {
        return JSON.stringify(fileData);
    }
    return fileData || '';
}
