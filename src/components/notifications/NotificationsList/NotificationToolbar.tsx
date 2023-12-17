import { Box, Button, InputAdornment, TextField } from '@mui/material';
import NewRepoDialog from '../../citros/dialogs/NewRepoDialogs';
import Iconify from 'src/components/iconify';

type Props = {
    onChange: (data: string | undefined) => void;
    markAllAsRead: () => void;
};

export function NotificationToolbar({ onChange, markAllAsRead }: Props) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
            <TextField
                placeholder={'Find a Notification...'}
                size={'small'}
                fullWidth
                sx={{ flex: 1 }}
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
            <Button variant="contained" color="primary" onClick={() => markAllAsRead()}>
                <Iconify icon={'ri:git-repository-line'} />
                Mark as read
            </Button>
        </Box>
    );
}
