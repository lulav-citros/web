import React from 'react';
import {
    EditModeActions,
    FileContentToolbar,
    FileDisplayBreadcrumbs,
    FileDisplayToolbar,
    ToggleEditMode,
    ToggleViewMode,
} from '../../FileDisplay';
import { useCommitEditorContext } from '../../CommitEditorContext';
import Markdown from '../../../../../markdown';
import { CodeEditor } from '../../../../../monaco';
import { toFileDataStringValue } from '../../file.utils';
import { FileContentLayout } from '../../FileContentLayout';

function MarkdownBlobView() {
    const {
        fileKey,
        fileRoute: { filePath },
        state: { viewMode, isEditing, fileData },
        actions: { setFileData },
    } = useCommitEditorContext();

    const readOnly = !isEditing;

    let editor =
        viewMode === 'CODE' ? (
            <CodeEditor
                key={fileKey}
                editorMinHeight={400}
                value={toFileDataStringValue(fileData)}
                onChange={setFileData}
                readOnly={readOnly}
            />
        ) : (
            <Markdown data={toFileDataStringValue(fileData) || ''} />
        );

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
                {editor}
            </FileContentLayout>
        </>
    );
}

export default MarkdownBlobView;
