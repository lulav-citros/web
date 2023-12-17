import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../../auth/useAuthContext';
import DraggableDrawer from 'src/components/drawer/DraggableDrawer';
import Iconify from 'src/components/iconify';
import { PATH_REPO } from 'src/routes/paths';
import InviteUserForm from 'src/sections/auth/InviteUserForm';

type Props = {
    onChange: (data: string | undefined) => void;
};

export function UserListToolbar({ onChange }: Props) {
    const currentUser = useAuthContext().user;
    const [inviteUserOpen, setInviteUserOpen] = useState(false);

    const handleInviteUserToggle = () => {
        setInviteUserOpen(!inviteUserOpen);
    };

    const handleInviteUserClose = () => {
        setInviteUserOpen(false);
    };

    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
            <TextField
                placeholder={'Find user...'}
                size={'small'}
                fullWidth
                sx={{ flex: 1, pr: 1 }}
                onChange={(event) => onChange(event.target.value)}
                // inputProps={{ style: { height: '16px' } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="majesticons:search-line" width={24} />
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                variant={'outlined'}
                onClick={() => setInviteUserOpen(!inviteUserOpen)}
                disabled={currentUser.role !== 'admin'}
            >
                Invite User
            </Button>
            <DraggableDrawer
                NavChildren={<Typography>Invite user</Typography>}
                open={inviteUserOpen}
                setOpen={handleInviteUserToggle}
                defaultDrawerWidth={400}
                minDrawerWidth={400}
                maxDrawerWidth={400}
            >
                <InviteUserForm onClose={handleInviteUserClose} />
            </DraggableDrawer>
        </Box>
    );
}
