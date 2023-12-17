import { ICodeCell } from '@jupyterlab/nbformat';
import { useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useJupyterEditorContext } from '../../context';
import { useKernelManager } from '../../../kernel';
import { CellLayout } from './CellLayout';
import { Box, CircularProgress, ClickAwayListener, Typography } from '@mui/material';
import { CodeEditor } from '../../../../monaco';
import { useEditorCell } from '../EditorCellContext';
import Iconify from '../../../../iconify';
import { useCellScrollTo } from '../UseCellScrollTo';
import { CellCodeOutput } from './CellCodeOutput';
import { joinSource } from 'src/components/jupyter/utils';

export function CellCode() {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const {
        state: { saving },
        config: { readonly },
    } = useJupyterEditorContext();
    const { status } = useKernelManager();

    const { cell, setCellEditMode, editSource, editCell, executeCell, isSelected, isExecuting } =
        useEditorCell<ICodeCell>();

    const source = cell.source instanceof Array ? joinSource(cell.source) : cell.source;
    const executeTime = cell.metadata.execution?.['iopub.execute_input'] ?? null;

    const handleEditClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            setCellEditMode(true);
        },
        [setCellEditMode]
    );

    // todo move to jupyet editor state actions
    const handleClearOutputs = () => {
        editCell({
            outputs: [],
            execution_count: null,
            metadata: {
                execution: {
                    'iopub.execute_input': null,
                    'iopub.status.busy': null,
                    'shell.execute_reply': null,
                    'iopub.status.idle': null,
                },
            },
        });
    };

    const handleSaveSource = () => {
        // setCellEditMode(false);
    };

    useCellScrollTo(ref);

    return (
        <ClickAwayListener onClickAway={handleSaveSource}>
            <CellLayout
                ref={ref}
                readonly={readonly}
                executionCount={cell.execution_count || '_'}
                // executionTime={executeTime}
                onExecuteClick={executeCell}
                onClearOutput={handleClearOutputs}
            >
                <Box
                    sx={{
                        position: 'relative',
                        border: `1px solid ${
                            isSelected
                                ? theme.palette.mode === 'dark'
                                    ? theme.palette.grey[800]
                                    : theme.palette.grey[200]
                                : 'transparent'
                        }`,
                        p: 0,
                    }}
                >
                    <CodeEditor
                        defaultLanguage={'python'}
                        value={source}
                        onChange={editSource}
                        readOnly={readonly || saving}
                        onClick={handleEditClick}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: theme.spacing(0.5),
                            left: theme.spacing(2),
                        }}
                    >
                        <Box display={'flex'} justifyContent={'center'} gap={1}>
                            {isExecuting ? (
                                <>
                                    <CircularProgress color={'inherit'} size={'1rem'} />
                                </>
                            ) : executeTime ? (
                                <>
                                    <Iconify icon="bx:check" color={theme.palette.success.main} fontSize={'small'} />
                                    <Typography variant={'caption'} fontSize={theme.typography.caption.fontSize}>
                                        {(executeTime / 1000).toFixed(1)}s
                                    </Typography>
                                </>
                            ) : null}
                        </Box>
                    </Box>
                </Box>

                {!!cell.outputs?.length && <CellCodeOutput outputs={cell.outputs} />}
            </CellLayout>
        </ClickAwayListener>
    );
}
