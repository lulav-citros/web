import React from 'react';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export function ToggleViewMode({ items = [] }: { items?: { value: string; label: string }[] }) {
    const {
        state: { viewMode },
        actions: { setViewMode },
    } = useCommitEditorContext();

    return (
        <ToggleButtonGroup aria-label="text button group" value={viewMode} size={'small'}>
            <ToggleButton
                value={'PREVIEW'}
                size={'small'}
                onClick={(event) => setViewMode('PREVIEW')}
                sx={{
                    px: 1,
                    py: 0,
                }}
            >
                Preview
            </ToggleButton>
            <ToggleButton
                value={'CODE'}
                size={'small'}
                onClick={(event) => setViewMode('CODE')}
                sx={{
                    px: 1,
                    py: 0,
                }}
            >
                Code
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
