import React, { useCallback, useState } from 'react';
import { CommitContext, FileEditorData, FileEditorRoute } from '../types';
import { CommitDialog } from './CommitDialog';
import { editGitFileApi } from '../../../gitolite.api';

export interface UseCommitDialogProps {
    onSuccess?: () => void;
    context: CommitContext;
}

export interface CommitDialogData{
    fileRoute: FileEditorRoute;
    fileData: FileEditorData;
}

export function useCommitDialog({ context, onSuccess }: UseCommitDialogProps) {
    const [{open, data}, setState] = useState<{open:boolean, data: CommitDialogData | null}>({
        open: false,
        data: null
    });
    const [loading, setLoading] = useState<boolean>(false);

    // COMMIT
    const handleSave = useCallback(
        async (message: string, extendedDescription: string) => {
            // console.log('commit dialog fileData', fileData);

            // console.log('commit dialog fileRoute.branch', fileRoute.branch);

            if (!context || !data) return Promise.resolve();

            setLoading(true);
            
            // let _data = typeof fileData === 'object' ? JSON.stringify(fileData, null, 4) : fileData || '';

            const {fileData, fileRoute} = data

            try {
                await editGitFileApi({
                    organizationSlug: context.organizationSlug,
                    repoName: fileRoute.repoName,
                    branch: fileRoute.branch,
                    filePath: fileRoute.filePath.join('/'),
                    fileData: fileData || "",
                    name: context.name,
                    email: context.email,
                    message,
                    extendedDescription,
                });
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }

            setState({open: false, data: null});
            onSuccess?.();
        },
        [onSuccess, data, context]
    );

    return {
        show: open,
        openDialog: (data: CommitDialogData) => {
            setState({open: true, data});
        },
        closeDialog: () => {
            setState({open: false, data: null});
        },
        component: (
            <CommitDialog
                branch={data?.fileRoute.branch || ''}
                loading={loading}
                filename={data?.fileRoute.fileName}
                committer={{
                    email: context?.email,
                }}
                open={open}
                onCancel={() => {
                    setState({open: false, data: null});
                }}
                onSave={handleSave}
            />
        ),
    };
}
