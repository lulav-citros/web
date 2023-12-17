import React from 'react';
import {
    EditModeActions,
    FileContentToolbar,
    FileDisplayBreadcrumbs,
    FileDisplayToolbar,
    ToggleEditMode,
} from '../../../FileDisplay';
import { Box } from '@mui/material';
import { useCommitEditorJupyterEditorProps } from './UseCommitEditorJupyterEditorProps';
import {
    EMPTY_NOTEBOOK_CONTENT,
    JupyterCellEditor,
    JupyterEditorMenu,
    JupyterProvider,
    KernelMenu,
} from '../../../../../../jupyter/editor';
import { StickyNavWrapper } from '../../../../../../sticky-nav';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import LoaderOverWidget from '../../../../../../loaderOverWidget';
import { FileContentLayout } from '../../../FileContentLayout';
import DocumentationDrawerComponent from 'src/components/documentation-drawer/DocumentationDrawer';
import {
    clearAllCellsOutputsStateAction,
    clearCellOutputsStateAction,
} from 'src/components/jupyter/editor/context/actions';
import { clearNotebookOutputs } from './utils';
import { INotebookContent } from '@jupyterlab/nbformat';
import { FileEditorData } from '../../../types';
import DataAnalysisDrawerComponent from 'src/components/citros/data-analysis-drawer/DataAnalysisDrawer';
import SnippetsDrawerComponent from 'src/components/snippets/SnippetsDrawer';

export function JupyterBlobView() {
    const commitEditorContext = useCommitEditorContext();
    const props = useCommitEditorJupyterEditorProps(commitEditorContext);

    const {
        state: { loading },
        fileRoute,
    } = commitEditorContext;

    if (loading) {
        return (
            <Box sx={{ position: 'relative', height: '50vh' }}>
                <LoaderOverWidget />
            </Box>
        );
    }

    return (
        <JupyterProvider {...props}>
            <FileDisplayToolbar>
                <FileDisplayBreadcrumbs />
                <Box sx={{ flex: 1 }}></Box>
                <Box>
                    <KernelMenu />
                </Box>
                {/* <Box flex={1}></Box> */}
                <Box>
                    {/* <DocumentationDrawerComponent iframeLink={'https://citros.io/doc/docs/repos/repository/repo_sc_code#directory-notebooks'} NavChildren={undefined} /> */}
                    <DataAnalysisDrawerComponent repoName={fileRoute.repoName} />
                    <SnippetsDrawerComponent repoName={fileRoute.repoName} />
                </Box>
            </FileDisplayToolbar>
            <FileContentLayout>
                <StickyNavWrapper topOffset={0}>
                    <FileContentToolbar>
                        <JupyterEditorMenu />
                        <Box display={'flex'} gap={0.5}>
                            <ToggleEditMode />
                            <EditModeActions
                                transformFileData={(data: FileEditorData) =>
                                    JSON.stringify(
                                        clearNotebookOutputs(
                                            data ? (JSON.parse(data) as INotebookContent) : EMPTY_NOTEBOOK_CONTENT
                                        )
                                    )
                                }
                            />
                        </Box>
                    </FileContentToolbar>
                </StickyNavWrapper>
                <JupyterCellEditor />
            </FileContentLayout>
        </JupyterProvider>
    );
}
