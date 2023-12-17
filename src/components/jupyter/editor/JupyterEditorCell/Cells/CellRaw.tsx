import { IRawCell } from '@jupyterlab/nbformat';
import { CellLayout } from './CellLayout';
import { Box, ClickAwayListener, Typography } from '@mui/material';
import { CodeEditor } from '../../../../monaco';
import { useEditorCell } from '../EditorCellContext';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useCellScrollTo } from '../UseCellScrollTo';
import { joinSource } from 'src/components/jupyter/utils';

export function CellRaw() {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const { cell, isEditing, isSelected, editSource, setCellEditMode } = useEditorCell<IRawCell>();

    const text = cell.source;

    const source = text instanceof Array ? joinSource(text) : text;

    const handleSaveSource = () => {
        setCellEditMode(false);
    };

    useCellScrollTo(ref);

    return (
        <CellLayout ref={ref} onEditClick={() => setCellEditMode(true)} onSave={handleSaveSource}>
            {isEditing ? (
                <ClickAwayListener onClickAway={() => setCellEditMode(false)}>
                    <Box
                        sx={{
                            border: `1px solid ${
                                isSelected
                                    ? theme.palette.mode === 'dark'
                                        ? theme.palette.grey[600]
                                        : theme.palette.grey[200]
                                    : 'transparent'
                            }`,
                            p: 0,
                        }}
                    >
                        <CodeEditor initialValue={source} onChange={editSource} />
                    </Box>
                </ClickAwayListener>
            ) : (
                <Box onDoubleClick={() => setCellEditMode(true)}>
                    <Typography variant={'body1'}>{source}</Typography>
                </Box>
            )}
        </CellLayout>
    );
}
