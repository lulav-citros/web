import React from 'react';
import {
    EditModeActions,
    FileContentToolbar,
    FileDisplayBreadcrumbs,
    FileDisplayToolbar,
    ToggleEditMode,
    ToggleViewMode,
} from '../../../FileDisplay';
import { CodeEditor } from '../../../../../../monaco';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { If } from 'react-if';
import { toFileDataStringValue } from '../../../file.utils';
import { FileContentLayout } from '../../../FileContentLayout';
import DocumentationDrawerComponent from 'src/components/documentation-drawer/DocumentationDrawer';
import { ParameterSetupFileView } from './ParameterSetupFileView';
import { Box } from '@mui/material';
import LoaderOverWidget from 'src/components/loaderOverWidget';

export function ParameterSetupBlobView() {
    const {
        fileKey,
        fileRoute: { filePath },
        state: { viewMode, isEditing, fileData, loading },
        actions: { setFileData },
    } = useCommitEditorContext();

    if (loading) {
        return (
            <Box sx={{ position: 'relative', height: '50vh' }}>
                <LoaderOverWidget />
            </Box>
        );
    }

    const readOnly = !isEditing;

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
            <ParameterSetupFileView
                key={fileKey}
                value={toFileDataStringValue(fileData)}
                onChange={setFileData}
                readOnly={readOnly}
            />
        );
    }

    return (
        <>
            <FileDisplayToolbar>
                <FileDisplayBreadcrumbs />
                <Box flex={1}></Box>
                {/* <DocumentationDrawerComponent
                    iframeLink={'https://citros.io/doc/docs/repos/repository/repo_sc_code#directory-parameter_setups'}
                    NavChildren={undefined}
                /> */}
            </FileDisplayToolbar>
            <FileContentLayout>
                <FileContentToolbar>
                    <ToggleViewMode />
                    <ToggleEditMode />
                    <EditModeActions />
                </FileContentToolbar>
                {component}
            </FileContentLayout>
        </>
    );
}
