import React from 'react';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { IconButton } from '@mui/material';
import Iconify from '../../../../../../iconify';

export function ToggleEditMode() {
    const {        
        actions: { setEditing },
        state: { isEditing },
    } = useCommitEditorContext();

    const handleEditClick = () => {
        setEditing(true);
    };

    return (
        <>
            {!isEditing && (
                <IconButton color="inherit" size={'small'} onClick={handleEditClick}>
                    <Iconify icon={'bx:edit'} />
                </IconButton>
            )}
        </>
    );
}
