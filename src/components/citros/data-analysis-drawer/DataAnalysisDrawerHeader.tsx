import {
    Box,
    Stack,
    Button,
    Dialog,
    Tooltip,
    Typography,
    IconButton,
    DialogActions,
    CircularProgress,
} from '@mui/material';
import Iconify from '../../iconify';

// ----------------------------------------------------------------------

export default function DataAnalysisDrawerHeader() {
    const handleEdit = () => {
        console.log('editing');
    };

    const handleOpen = () => {
        console.log('opening');
    };

    return (
        <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            flexGrow={{ xs: 1 }}
        >
            <Typography>DataAnalysis</Typography>
            <Stack direction="row">
                <Tooltip title="Edit">
                    <IconButton onClick={handleEdit}>
                        <Iconify icon="eva:edit-fill" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="View">
                    <IconButton onClick={handleOpen}>
                        <Iconify icon="eva:eye-fill" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Send">
                    <IconButton>
                        <Iconify icon="ic:round-send" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}
