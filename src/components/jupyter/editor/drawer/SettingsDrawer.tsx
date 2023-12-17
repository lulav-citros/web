import { useState } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Divider, Drawer, Stack, Typography, Tooltip, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
// config
import { NAV } from '../../../../config';
//
import Iconify from '../../../iconify';
import Scrollbar from '../../../scrollbar';
//

// ----------------------------------------------------------------------

const SPACING = 2.5;

export default function NotebookDrawer() {
    const theme = useTheme();

    const [open, setOpen] = useState(true);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                BackdropProps={{ invisible: true }}
                PaperProps={{
                    sx: {
                        ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
                        width: NAV.W_BASE,
                        boxShadow: (theme) =>
                            `-24px 12px 40px 0 ${alpha(
                                theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
                                0.16
                            )}`,
                    },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ py: 2, pr: 1, pl: SPACING }}
                >
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Settings
                    </Typography>

                    <IconButton onClick={handleClose}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ p: SPACING, pb: 0 }}>vova</Scrollbar>

                {/* <Box sx={{ p: SPACING, pt: 0 }}>
          <FullScreenOptions />
        </Box> */}
            </Drawer>
        </>
    );
}
