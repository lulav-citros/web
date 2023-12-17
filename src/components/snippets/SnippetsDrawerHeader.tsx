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
import Iconify from '../iconify';

// ----------------------------------------------------------------------

export default function SnippetsDrawerHeader() {
    return (
        <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
            flexGrow={{ xs: 1 }}
        >
            <Typography>Data Analysis Code Snippets</Typography>
        </Stack>
    );
}
