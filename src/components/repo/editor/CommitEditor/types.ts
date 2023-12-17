export interface CommitContext {
    // auth context
    organizationSlug: string;
    name: string;
    email: string;
}

export interface CommitEditorState {
    // permission: FilePermission;
    loading: boolean;
    error?: string;
    isEditing: boolean;

    fileDataInitial: FileEditorData;
    fileData: FileEditorData;
    viewMode: 'CODE' | 'PREVIEW';
}

export interface ExportersState {
    exporting: boolean
}

export interface CommitEditorMapState {
    files: { [fileKey: string]: CommitEditorState };
}

export enum FileSchemaType {
    SIMULATIONS = 'SIMULATIONS',
    WORKFLOWS = 'WORKFLOWS',
    SETTINGS = 'SETTINGS',
    REPORTS = 'REPORTS',
    PARAMETER_SETUPS = 'PARAMETER_SETUPS',
    NOTEBOOKS = 'NOTEBOOK',
    FUNCTIONS = 'FUNCTIONS',
}

export type FilePermission = 'READ' | 'WRITE';

export enum FileExtension {
    JSON = 'JSON',
    MARKDOWN = 'MARKDOWN',
    TEXT = 'TEXT',
    NOTEBOOK = 'NOTEBOOK',
    PYTHON = 'PYTHON',
}

export interface FileEditorRoute {
    asPath?: string;
    type: 'tree' | 'blob';
    branch: string;
    permission: 'READ' | 'WRITE' | 'EXECUTE';
    repoName: string;
    filePath: string[];
    folders: string[];
    fileName?: string;
    ext?: string;
    fileType?: FileExtension;
    schemaType?: FileSchemaType;
}

export type FileEditorData = string | undefined;
