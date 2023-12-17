import React from 'react';
import {
    EditModeActions,
    FileContentToolbar,
    FileDisplayBreadcrumbs,
    FileDisplayToolbar,
    ToggleEditMode,
    ToggleViewMode,
} from '../../../FileDisplay';
import { Box, Divider } from '@mui/material';
import { CodeEditor } from '../../../../../../monaco';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { If } from 'react-if';
import { toFileDataStringValue } from '../../../file.utils';
import { SimulationFilePreviewer } from './SimulationFilePreviewer';
import { FileContentLayout } from '../../../FileContentLayout';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import DocumentationDrawerComponent from 'src/components/documentation-drawer/DocumentationDrawer';

export function SimulationBlobView() {
    const {
        fileKey,
        fileRoute: { filePath },
        state: { viewMode, isEditing, fileData, loading },
        actions: { setFileData },
    } = useCommitEditorContext();

    const readOnly = !isEditing;
    if (loading) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }
    let component;
    if (viewMode === 'CODE') {
        component = (
            <CodeEditor
                key={fileKey}
                editorMinHeight={400}
                value={toFileDataStringValue(fileData)}
                onChange={setFileData}
                readOnly={readOnly}
            />
        );
    } else {
        component = (
            <SimulationFilePreviewer key={fileKey} value={toFileDataStringValue(fileData)} onChange={setFileData} readOnly={readOnly} />
        );
    }
    return (
        <>
            <FileDisplayToolbar>
                <FileDisplayBreadcrumbs />
                <Box flex={1}></Box>
                {/* <DocumentationDrawerComponent  iframeLink={'https://citros.io/doc/docs/repos/repository/repo_sc_code#directory-simulations'} NavChildren={undefined} /> */}
            </FileDisplayToolbar>
            <FileContentLayout>
                <FileContentToolbar>
                    <ToggleViewMode />
                    <ToggleEditMode />
                    <EditModeActions />
                </FileContentToolbar>
                <Divider />
                {component}
            </FileContentLayout>
        </>
    );
}
