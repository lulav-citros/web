import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SSHKeyNewDialog } from './SSHKeyNewDialog';

type Props = { refetch: () => void };

export function SshKeyRowHeader({ refetch }: Props) {
    return (
        <Box sx={{ mx: 5 }}>
            <Stack spacing={3} alignItems="flex-start" justifyContent="space-between" direction="row" sx={{ p: 3 }}>
                <Typography variant="h4">SSH Keys</Typography>
                <SSHKeyNewDialog refetch={refetch} />
            </Stack>
            <Divider light />
            <Typography variant="body1" sx={{ py: 2, px: 3 }}>
                This is a list of SSH keys associated with your account. Remove any keys that you do not recognize.
            </Typography>
            <Typography variant="h5" sx={{ py: 2, px: 3 }}>
                Authentication Keys
            </Typography>
        </Box>
    );
}
