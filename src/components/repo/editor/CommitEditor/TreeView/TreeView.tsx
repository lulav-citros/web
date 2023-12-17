import React from 'react';
import { FileDisplayBreadcrumbs, FileDisplayToolbar } from '../FileDisplay';
import { TreeTable } from './TreeTable';
import { TreeViewFolderReadmePreview } from './TreeViewFolderReadmePreview';

export function TreeView() {
    return (
        <>
            <FileDisplayToolbar>
                <FileDisplayBreadcrumbs />
            </FileDisplayToolbar>
            <TreeTable />
            <TreeViewFolderReadmePreview />
        </>
    );
}
