import React from 'react';
import { Box } from '@mui/material';
import { CommitEditorContextProvider } from './CommitEditorContext';
import { CommitContext, FileEditorRoute } from './types';
import { FileDisplay } from './FileDisplay';
import { CommitEditorFileBrowser } from './CommitEditorFileBrowser';
import { useCitrosMonacoTheme } from '../../../monaco';

export interface CommitEditorProps {
    context: CommitContext;
    fileRoute: FileEditorRoute;
}

export function CommitEditor({ context, fileRoute }: CommitEditorProps) {
    useCitrosMonacoTheme();

    return (
        <CommitEditorContextProvider context={context} fileRoute={fileRoute}>
            <CommitEditorContent />
        </CommitEditorContextProvider>
    );
}

function CommitEditorContent() {
    const fileBrowserWidth = 380;
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            {/* TODO sticky */}
            <Box
                sx={{
                    minWidth: `${fileBrowserWidth}px`,
                    width: `${fileBrowserWidth}px`,
                    borderRight: '1px solid',
                    borderColor: 'grey.800',
                    height: '100vh',
                    padding: 1,
                }}
            >
                <CommitEditorFileBrowser />
            </Box>
            <Box sx={{ flex: 1, width: `calc(100vw - ${fileBrowserWidth}px)`, px: 2, pr: 2 }}>
                <FileDisplay />
            </Box>
        </Box>
    );
}
