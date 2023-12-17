import React from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { CommitDialogData } from '../../../CommitDialog';
import { FileEditorData } from '../../../types';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';

interface Props {
    transformFileData?: (data: FileEditorData) => FileEditorData;
}

export function ExportModeActions({ transformFileData }: Props) {
    const {
        exportersState,
        actions: { exportPDF },
    } = useCommitEditorContext();

    return (
        <>
            {exportersState.exporting &&
            <Box
                component={m.div}
                animate={{
                    scale: [1, 1, 1, 1, 1],
                    rotate: [0, 270, 270, 0, 0],
                    opacity: [1, 1, 1, 1, 1],
                    borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                }}
                transition={{
                    ease: 'linear',
                    duration: 3.2,
                    repeat: Infinity,
                }}
                sx={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    border: (theme) => `solid 1px ${alpha(theme.palette.primary.dark, 0.24)}`,
                }}
            />
            }

            <IconButton
                disabled={exportersState.exporting}
                onClick={() => {                    
                    exportPDF();
                }}
                color={'success'}
                size={'small'}
            >
                <Iconify icon="teenyicons:pdf-outline" />
            </IconButton>
            
        </>
    );
}
