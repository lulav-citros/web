import React from 'react';
import {
    EditModeActions,
    FileContentToolbar,
    FileDisplayBreadcrumbs,
    FileDisplayToolbar,
    ToggleEditMode,
    ToggleViewMode,
} from '../../FileDisplay';
import { CodeEditor } from '../../../../../monaco';
import { useCommitEditorContext } from '../../CommitEditorContext';
import { toFileDataStringValue } from '../../file.utils';
import { FileContentLayout } from '../../FileContentLayout';

function CodeBlobView() {
    const {
        fileKey,
        fileRoute: { filePath },
        state: { viewMode, isEditing, fileData },
        actions: { setFileData },
    } = useCommitEditorContext();

    const readOnly = !isEditing;

    return (
        <>
            <FileDisplayToolbar>
                <FileDisplayBreadcrumbs />
            </FileDisplayToolbar>
            <FileContentLayout>
                <FileContentToolbar>
                    <ToggleViewMode />
                    <ToggleEditMode />
                    <EditModeActions />
                </FileContentToolbar>
                <CodeEditor
                    key={fileKey}
                    editorMinHeight={400}
                    value={toFileDataStringValue(fileData)}
                    onChange={setFileData}
                    readOnly={readOnly}
                />
            </FileContentLayout>
        </>
    );
}

export default CodeBlobView;
