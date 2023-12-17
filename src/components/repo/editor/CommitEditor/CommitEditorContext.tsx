import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CommitDialogData, useCommitDialog } from './CommitDialog';
import { CommitContext, CommitEditorState, ExportersState, FileEditorData, FileEditorRoute } from './types';
import { getGitFileApi, IGetFileRequest } from '../../gitolite.api';
import { toGetFileRequest } from './mapper';
import { generateFileKey, getIsFolder } from './file.utils';
import { useGitRepository } from './UseGitRepository';
import { GitRepository } from '../../gitolite.types';
import { useNotebookExporters } from './useNotebookExporters';
import Repo404 from 'src/pages/404Repo';

export interface CommitEditorContextType {
    isFolder: boolean;
    fileKey: string;
    context: CommitContext;
    fileRoute: FileEditorRoute;
    state: CommitEditorState;
    exportersState: ExportersState;
    gitRepository: GitRepository | null;
    actions: {
        // setMode: (mode: CommitEditorState['permission']) => void;
        setViewMode: (mode: CommitEditorState['viewMode']) => void;
        setEditing: (value: boolean) => void;
        //
        commit: (data: CommitDialogData) => void;
        discardChanges: () => void;

        //
        exportPDF: () => void;

        //
        setFileData: (data?: FileEditorData) => void;
        loadFile: (request: IGetFileRequest) => void;
    };
}

export const CommitEditorContext = createContext({} as CommitEditorContextType);

export function useCommitEditorContext() {
    return useContext(CommitEditorContext);
}

interface CommitEditorContextProviderProps {
    context: CommitContext;
    fileRoute: FileEditorRoute;
    initialState?: Partial<CommitEditorState>;
}

const INITIAL_STATE: CommitEditorState = {
    // permission: 'WRITE',
    loading: false,
    isEditing: false,
    viewMode: 'PREVIEW',
    fileData: '',
    fileDataInitial: '',
};

export function CommitEditorContextProvider({
    context,
    fileRoute,
    initialState,
    children,
}: PropsWithChildren<CommitEditorContextProviderProps>) {
    const {
        loading: loadingGitRepository,
        gitRepository,
        load: loadGitRepository,
        error: gitRepoErrorCode,
    } = useGitRepository();

    const fileKey: string = generateFileKey(fileRoute);

    const [state, setState] = useState<CommitEditorState>({
        loading: false,
        isEditing: false,
        viewMode: 'PREVIEW',
        fileData: localStorage.getItem(fileKey) || '',
        fileDataInitial: localStorage.getItem(fileKey) || '',
        ...initialState,
    });

    const [exportersState, setExportersState] = useState<ExportersState>({
        exporting: false,
        ...initialState,
    });

    const loading = state.loading || loadingGitRepository;

    const isFolder = useMemo(
        () => getIsFolder(gitRepository || {}, fileRoute.filePath),
        [gitRepository, fileRoute.filePath]
    );

    useEffect(() => {
        // Initialize tree for file browser
        loadGitRepository({
            organizationSlug: context.organizationSlug,
            repoName: fileRoute.repoName,
            branch: fileRoute.branch,
        });
    }, [fileRoute.repoName, fileRoute.branch, context.organizationSlug]);

    const loadFile = useCallback((request: IGetFileRequest) => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
            fileData: undefined,
            fileDataInitial: undefined,
            isEditing: false,
            viewMode: 'PREVIEW',
            error: undefined,
            // permission: 'READ',
        }));

        getGitFileApi(request)
            .then((fileData) => {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    fileData: fileData,
                    fileDataInitial: fileData,
                }));
            })
            .catch((reason) => {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    error: reason?.message,
                }));
            });
    }, []);

    const initialize = useCallback(() => {
        const type = fileRoute.type;

        if (type === 'tree') {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                fileData: undefined,
                fileDataInitial: undefined,
                isEditing: false,
            }));
            return;
        }

        if (type === 'blob') {
            let fileData = localStorage.getItem(fileKey);

            if (fileData != null) {
                setState((prevState) => {
                    const file = JSON.parse(fileData as string);
                    return {
                        ...prevState,
                        loading: false,
                        fileData: file,
                        fileDataInitial: file,
                        isEditing: true,
                    };
                });
                return;
            }
        }
        loadFile(toGetFileRequest(context, fileRoute));
    }, [fileRoute, fileKey, context, loadFile]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    const { openDialog: commit, component: commitDialog } = useCommitDialog({
        context,
        // fileRoute,
        // fileData: state.fileData,
        onSuccess: () => {
            localStorage.removeItem(fileKey);
            setState((prevState) => ({ ...prevState, isEditing: false }));
            loadFile(toGetFileRequest(context, fileRoute));
        },
    });

    // const setMode = useCallback((mode: CommitEditorState['permission']) => {
    //     setState((prevState) => ({ ...prevState, permission: mode }));
    // }, []);

    const setViewMode = useCallback((viewMode: CommitEditorState['viewMode']) => {
        setState((prevState) => ({ ...prevState, viewMode }));
    }, []);

    const setEditing = useCallback(
        (isEditing: boolean) => {
            // todo exit view mode on true
            setState((prevState) => ({ ...prevState, isEditing }));

            // console.log('state', state);
            if (state.loading) {
                return false;
            }
        },
        [fileRoute]
    );

    // useEffect(() => {
    //     localStorage.setItem(fileKey, JSON.stringify(state.fileData));
    // }, [state.fileData])

    const discardChanges = useCallback(() => {
        // console.log("discard changes");

        localStorage.removeItem(fileKey);
        loadFile(toGetFileRequest(context, fileRoute));
    }, [fileKey, context, fileRoute, loadFile]);

    const setFileData = useCallback(
        (fileData: FileEditorData) => {
            // console.log('vovaSaving file to local storage', fileKey, fileData);
            localStorage.setItem(fileKey, JSON.stringify(fileData));
            setState((prevState) => ({ ...prevState, fileData }));
        },
        [fileKey]
    );

    //////////////////////////////
    // Exporters
    //////////////////////////////
    const { PDFExporter, JobStatusUpdater } = useNotebookExporters();
    // initial values for exporters
    useEffect(() => {
        const job_id = localStorage.getItem('job:nbconvert:id');
        if (job_id) {
            setExportersState((prevState) => ({ ...prevState, exporting: true }));
        }
    }, []);

    useEffect(() => {
        if (exportersState.exporting) {
            const interval = setInterval(async () => {
                // console.log('polling exporter');

                let isExporting: boolean = await JobStatusUpdater();

                setExportersState((prevState) => ({ ...prevState, exporting: isExporting }));

                if (!isExporting) {
                    // console.log('finished job. stop polling.');
                    clearInterval(interval);
                }
            }, 1000 * 5);
        }
    }, [exportersState.exporting]);

    const exportPDF = useCallback(() => {
        if (exportersState.exporting) {
            console.warn('Already exporting something... please wait for previous job to finish.');
            return;
        }

        setExportersState((prevState) => ({ ...prevState, exporting: true }));

        // console.log("state.fileData", state.fileData)
        return PDFExporter({
            tenant: context.organizationSlug,
            repo_name: fileRoute.repoName,
            notebook_path: fileRoute.filePath.join('/'),
            notebook_name: fileRoute.fileName as string,
            format: 'pdf',
            notebook_data: JSON.parse(state.fileData as string),
        });
    }, [PDFExporter, state.fileData, fileRoute, context]);

    if (gitRepoErrorCode && gitRepoErrorCode == 404) {
        return <Repo404 />;
    }

    return (
        <CommitEditorContext.Provider
            value={{
                isFolder,
                fileKey,
                context,
                fileRoute,
                exportersState,
                state: {
                    ...state,
                    loading,
                },
                gitRepository,
                actions: {
                    // setMode,
                    setViewMode,
                    setEditing,
                    commit,
                    discardChanges,
                    setFileData,
                    loadFile,
                    exportPDF,
                },
            }}
        >
            <>
                {children}
                {commitDialog}
            </>
        </CommitEditorContext.Provider>
    );
}
