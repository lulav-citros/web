import React from 'react';
import { Button, Stack } from '@mui/material';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { CommitDialogData } from '../../../CommitDialog';
import { FileEditorData } from '../../../types';

interface Props {
    transformFileData?: (data: FileEditorData) => FileEditorData;
}

export function EditModeActions({ transformFileData }: Props) {
    const {
        fileRoute,
        state: { isEditing, fileData },
        actions: { commit, discardChanges },
    } = useCommitEditorContext();

    return (
        <>
            {isEditing && (
                <Stack direction={'row'} alignItems={'center'} gap={0.5}>
                    <Button
                        variant="outlined"
                        color="success"
                        size={'small'}
                        onClick={() =>
                            commit({
                                fileData: transformFileData ? transformFileData(fileData) : fileData,
                                fileRoute,
                            })
                        }
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Commit changes
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        size={'small'}
                        onClick={discardChanges}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Cancel changes
                    </Button>
                </Stack>
            )}
        </>
    );
}
