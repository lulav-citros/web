import { useMutation } from '@apollo/client';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { DELETE_SSH_KEY } from 'src/graphQL/sshKeys';
import { SSHKey } from './types';

type Props = {
    sshKey: SSHKey;
    refetch: () => void;
};

export function SshKeyRow({ sshKey, refetch }: Props) {
    const [deleteSSHKey, { loading: deleteLoading }] = useMutation(DELETE_SSH_KEY);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = useMemo(() => {
        return async () => {
            try {
                await deleteSSHKey({
                    variables: {
                        userId: user?.id,
                        title: sshKey?.title,
                    },
                });
                enqueueSnackbar('SSH Key deleted successfully!', { variant: 'success' });
                setOpenDeleteDialog(false);
                refetch();
            } catch (err) {
                console.error('Error deleting SSH Key:', err);
                enqueueSnackbar('Failed to delete SSH Key. Please try again.', { variant: 'error' });
            }
        };
    }, [user, sshKey]);

    return (
        <>
            <ConfirmDialog
                open={openDeleteDialog}
                onClose={() => {
                    setOpenDeleteDialog(false);
                }}
                title="Delete"
                content={`Are you sure want to delete '${sshKey.title}'?`}
                action={
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                }
            />
            <Box
                key={sshKey.id}
                sx={{
                    px: 2,
                    // borderBottom: index < data.sshKeysList.length - 1 ? 1 : 'none',
                    borderBottom: 1,
                    borderBottomColor: 'grey.800',
                    py: 1,
                }}
                display={'flex'}
                justifyContent={'space-between'}
                gap={1}
            >
                <Box sx={{ pt: 3, minWidth: '10px' }}>
                    <Iconify icon={'solar:key-linear'} width={36} />
                </Box>
                <Box flex={1} sx={{ p: 2, flexGrow: 1, width: '100px', overflowWrap: 'break-word' }}>
                    <Typography variant="h4">{sshKey.title}</Typography>
                    <Typography variant="body2">{sshKey.key}</Typography>
                </Box>
                <Box sx={{ pt: 3, minWidth: '100px' }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            setOpenDeleteDialog(true);
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </>
    );
}
