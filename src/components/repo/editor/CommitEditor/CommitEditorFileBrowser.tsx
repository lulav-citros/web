import React from 'react';
import { Box } from '@mui/material';
import FolderStructure from './FileBrowser';
import { useCommitEditorContext } from './CommitEditorContext';
import { StickyNavWrapper } from 'src/components/sticky-nav';

export function CommitEditorFileBrowser() {
    const { fileRoute, gitRepository } = useCommitEditorContext();

    const currentPath = fileRoute.filePath.join('/');

    return (
        <StickyNavWrapper topOffset={0}>
            <Box p={1}>
                {/*<CustomizedTreeView />*/}
                <FolderStructure
                    data={gitRepository || {}}
                    currentPath={currentPath}
                    repoName={fileRoute.repoName}
                    branch={fileRoute.branch}
                />
            </Box>
        </StickyNavWrapper>
    );
}
