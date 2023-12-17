import React from 'react';
import { useCommitEditorContext } from '../CommitEditorContext';
import TreeView from '../TreeView';
import BlobView from '../BlobView';

export function FileDisplay() {
    const {
        isFolder,
        state: { loading, error },
    } = useCommitEditorContext();

    if (isFolder) {
        return <TreeView />;
    }

    return <BlobView />;
}
