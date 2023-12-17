import React, { FC, useCallback } from 'react';
import { useJupyterEditorContext } from './context';
import Iconify from '../../iconify';
import { CellType } from '@jupyterlab/nbformat';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box, ListItem, Switch, Typography } from '@mui/material';
import { ExportModeActions } from 'src/components/repo/editor/CommitEditor/FileDisplay/Toolbar/components/ExportModeActions';

export const JupyterEditorMenu: FC = () => {
    const {
        config: { readonly },
        state: { cellType, selectedCellId, executing, error },
        changeIndicator,
        actions: { addNewCell, setCellType, saveContents, clearAllOutputs, executeAll },
    } = useJupyterEditorContext();

    const handleSave = useCallback(() => {
        saveContents();
    }, [saveContents]);

    const handleAddCell = useCallback(() => {
        addNewCell(selectedCellId != null ? selectedCellId : undefined);
    }, [addNewCell, selectedCellId]);

    const handleAddCodeCell = useCallback(() => {
        addNewCell(selectedCellId != null ? selectedCellId : undefined, 'code');
    }, [addNewCell, selectedCellId]);

    const handleAddMarkdownCell = useCallback(() => {
        addNewCell(selectedCellId != null ? selectedCellId : undefined, 'markdown');
    }, [addNewCell, selectedCellId]);

    const cutCell = useCallback(() => {}, []);

    return (
        <Grid container gap={2} flexWrap={'nowrap'}>
            <Button
                onClick={handleAddCodeCell}
                color={'inherit'}
                size={'small'}
                startIcon={<Iconify icon="bx:plus" />}
                disabled={executing || readonly}
            >
                Code
            </Button>
            <Button
                onClick={handleAddMarkdownCell}
                color={'inherit'}
                size={'small'}
                startIcon={<Iconify icon="bx:plus" />}
                disabled={executing || readonly}
            >
                Markdown
            </Button>
            <Divider orientation="vertical" flexItem />
            <Tooltip title={'Export as PDF.'}>
                <Box>
                    <ExportModeActions />
                </Box>
            </Tooltip>
            {/* <Tooltip title={'Save current changes to notebook.'}>
                <span>
                    <IconButton
                        disabled={!changeIndicator || readonly}
                        onClick={handleSave}
                        color={!changeIndicator ? 'inherit' : 'warning'}
                        size={'small'}
                    >
                        <Iconify icon="bx:save" />
                    </IconButton>
                </span>
            </Tooltip> */}
            <Tooltip title={'Execute all cells.'}>
                <span>
                    <IconButton onClick={executeAll} size={'small'} color={'success'} disabled={executing}>
                        {executing ? (
                            <CircularProgress color={'inherit'} size={'1rem'} />
                        ) : (
                            <Iconify icon="codicon:run-all" />
                        )}
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={'Clear all outputs.'}>
                <IconButton onClick={clearAllOutputs} size={'small'} color={'info'} disabled={executing}>
                    <Iconify icon="codicon:clear-all" />
                </IconButton>
            </Tooltip>
            <IconButton sx={{ display: 'none' }} onClick={() => {}} size={'small'}>
                <Iconify icon="bx:export" />
            </IconButton>
            <CellTypeSelectionInput
                selected={cellType}
                onSelect={(type) => setCellType(type)}
                disabled={executing || readonly}
            />
            <JupyterSettingsMenu />
        </Grid>
    );
};

interface CellTypeOption {
    type: CellType;
    label: string;
}

const cellTypeOptions: CellTypeOption[] = [
    { type: 'code', label: 'Code' },
    { type: 'markdown', label: 'Markdown' },
    // { type: 'raw', label: 'Raw' },
];

const CellTypeSelectionInput: FC<{ selected: CellType; onSelect: (type: CellType) => void; disabled?: boolean }> = ({
    selected,
    onSelect,
    disabled,
}) => {
    return (
        <Select value={selected} size={'small'} disabled={disabled}>
            {cellTypeOptions.map((item) => (
                <MenuItem
                    key={item.type}
                    selected={selected === item.type}
                    value={item.type}
                    onClick={() => onSelect(item.type)}
                >
                    {item.label}
                </MenuItem>
            ))}
        </Select>
    );
};

function JupyterSettingsMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {
        state: {
            settings: { autoScroll },
        },
        actions: { setSettings },
    } = useJupyterEditorContext();

    const toggleAutoScroll = () => {
        setSettings({
            autoScroll: !autoScroll,
        });
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="jupyter-settings-button"
                aria-controls={open ? 'jupyter-settings-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Iconify icon={'ic:round-more-vert'} />
            </IconButton>
            <Menu
                id="jupyter-settings-menu"
                MenuListProps={{
                    'aria-labelledby': 'jupyter-settings-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <ListItem>
                    <Typography variant={'subtitle1'}>Settings</Typography>
                </ListItem>
                {/*<Divider />*/}
                <MenuItem onClick={handleClose}>
                    Auto scroll
                    <Switch
                        size={'medium'}
                        checked={autoScroll}
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleAutoScroll();
                        }}
                    />
                </MenuItem>
            </Menu>
        </>
    );
}
