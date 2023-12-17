import { useState } from 'react';
// @mui
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------
type Props = {
    open: boolean;
    onDelete?: VoidFunction;
    handleClose: VoidFunction;
};

export default function DeleteDialog({ open, onDelete, handleClose }: Props) {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>DELETE: Are you absolutely sure? </DialogTitle>

                <DialogContent dividers sx={{ pt: 0, pb: 2 }}>
                    <Stack spacing={1}>
                        <Alert severity="warning" sx={{ mb: 1 }}>
                            Unexpected bad things will happen if you don’t read this!
                        </Alert>

                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone.
                        </DialogContentText>

                        <DialogContentText>This will permanently delete the item.</DialogContentText>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        color="error"
                        onClick={() => {
                            handleClose();
                            onDelete ? onDelete() : {};
                        }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
