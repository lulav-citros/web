import { useState } from 'react';
// @mui
import { Divider, IconButton, MenuItem } from '@mui/material';
import MenuPopover from 'src/components/menu-popover';
import Iconify from 'src/components/iconify';
import DeleteDialog from './DeleteDialog';

// ----------------------------------------------------------------------

type Props = {
    onEdit?: VoidFunction;
    onDelete?: VoidFunction;
    onDuplicate?: VoidFunction;
    onNavigate?: VoidFunction;
};

export default function ManueItemListMenue({ onEdit, onDelete, onDuplicate, onNavigate }: Props) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const [onDeleteDialogOpen, setOnDeleteDialogOpen] = useState<boolean>(false);

    return (
        <>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleOpenPopover}>
                <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                arrow="top-center"
                sx={{ width: 160 }}
            >
                {onNavigate && (
                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            onNavigate();
                        }}
                    >
                        <Iconify icon="ic:outline-open-in-new" />
                        Navigate
                    </MenuItem>
                )}

                {onDuplicate && (
                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            onDuplicate();
                        }}
                    >
                        <Iconify icon="octicon:duplicate-24" />
                        Duplicate
                    </MenuItem>
                )}

                {onEdit && (
                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            onEdit();
                        }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Edit
                    </MenuItem>
                )}

                <Divider></Divider>
                {onDelete && (
                    <MenuItem
                        onClick={() => {
                            handleClosePopover();
                            setOnDeleteDialogOpen(true);
                            // onDelete();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="eva:trash-2-outline" />
                        Delete
                    </MenuItem>
                )}
            </MenuPopover>
            <DeleteDialog
                open={onDeleteDialogOpen}
                onDelete={onDelete}
                handleClose={() => setOnDeleteDialogOpen(false)}
            />
        </>
    );
}
