import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import { bgBlur } from '../../../../../utils/cssStyles';
import {
    DeleteCellIconButton,
    DuplicateCellIconButton,
    ExecuteCellIconButton,
    MoveCellDownIconButton,
    MoveCellUpIconButton,
} from './CellIconButtons';

export interface CellBlockSideMenuProps {
    onPlayClick?: () => void;
    display?: boolean;
    onExecuteClick?: () => void;
}

export const CellLayoutSideMenu: FC<CellBlockSideMenuProps> = ({ display, onExecuteClick }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: display ? 'block' : 'none',
                position: 'absolute',
                top: theme.spacing(-1.8),
                left: theme.spacing(7),
                zIndex: 1000,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.25rem',
                transition: 'opacity 0.2s ease',
                // boxShadow: '5px 5px 5px rgba(0,0,0,0.2)',
                ...bgBlur({
                    color: theme?.palette.background.default,
                    opacity: 0.1,
                    blur: 2,
                }),
            }}
        >
            <Grid
                container
                p={0}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {onExecuteClick && <ExecuteCellIconButton onExecuteClick={onExecuteClick} />}
                <DuplicateCellIconButton />

                <MoveCellUpIconButton />
                <MoveCellDownIconButton />
                <DeleteCellIconButton />
            </Grid>
        </Box>
    );
};
