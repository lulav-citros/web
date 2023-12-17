import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, IconButton, Tooltip } from '@mui/material';
import { forwardRef, PropsWithChildren } from 'react';
import { CellLayoutSideMenu } from './CellLayoutSideMenu';
import { useEditorCell } from '../EditorCellContext';
import Iconify from '../../../../iconify';
import { ExecuteCellIconButton } from './CellIconButtons';

export const CellMainBox = styled(Box)<BoxProps & { isHighlighted?: boolean }>(({ theme }) => ({
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    p: 0,
    transition: 'background 0.2s ease',
    display: 'flex',
    flexWrap: 'nowrap',
    borderLeft: `4px solid transparent`,
    '&.MuiBox-highlighted': {
        borderLeftColor: theme.palette.primary.main,
        '&:hover': { borderLeftColor: theme.palette.primary.main },
    },
    '&:hover': {
        borderLeftColor: theme.palette.background.neutral,
    },
    '.jp-OutputArea-prompt': {
        display: 'none',
    },
}));

export interface CellBlockProps {
    executionCount?: number | string;
    onExecuteClick?: () => void;
    onEditClick?: () => void;
    onClearOutput?: () => void;
    onSave?: () => void;
    isEditing?: boolean;
    readonly?: boolean;
}

export const CellLayout = forwardRef(
    (
        {
            children,
            executionCount,
            onExecuteClick,
            onEditClick,
            onClearOutput,
            onSave,
            isEditing,
            readonly,
        }: PropsWithChildren<CellBlockProps>,
        ref
    ) => {
        const theme = useTheme();
        const { isSelected, isLoading, selectCell } = useEditorCell();

        return (
            <CellMainBox ref={ref} onClick={selectCell} className={isSelected ? 'MuiBox-highlighted' : ''}>
                <Grid item width={theme.spacing(6)}>
                    <Grid
                        container
                        flexDirection={'column'}
                        alignItems={'center'}
                        alignContent={'center'}
                        height={'100%'}
                        gap={1}
                    >
                        {onExecuteClick && <ExecuteCellIconButton onExecuteClick={onExecuteClick} />}
                        <code style={{ fontSize: theme.typography.pxToRem(12) }}>
                            {executionCount !== undefined ? `[${executionCount || '_'}]` : ''}
                        </code>
                        {onClearOutput && !readonly && (
                            <Tooltip title={"Clear cell's execution output results."}>
                                <IconButton onClick={onClearOutput} size={'small'}>
                                    <Iconify icon="mingcute:eraser-fill" fontSize={'smaller'} />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Grid item flex={1} />
                        <Grid display={'none'}>
                            <IconButton sx={{ p: 0.5 }} onClick={() => {}} size={'small'}>
                                <Iconify icon="bx:expand-horizontal" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <CellLayoutSideMenu display={!readonly && isSelected} onExecuteClick={onExecuteClick} />
                <Box
                    flex={1}
                    sx={{
                        flex: '0 1 80vw',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 0,
                        overflowX: 'auto',
                    }}
                >
                    {children}
                </Box>
            </CellMainBox>
        );
    }
);
