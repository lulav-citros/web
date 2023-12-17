import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Divider, Link, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH, PATH_DASHBOARD, PATH_DOCS, PATH_PAGE, PATH_SETTINGS } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from 'src/components/iconify/Iconify';
import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { textGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const OPTIONS = [
    {
        label: 'Home',
        linkTo: '/',
    },
    {
        label: 'Settings',
        linkTo: PATH_SETTINGS.root,
    },
    {
        label: 'Notifications',
        linkTo: PATH_PAGE.notifications,
    },
    // {
    //     label: 'Documentation',
    //     linkTo: PATH_DOCS.root,
    // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const { replace, push } = useRouter();

    const { user, logout } = useAuthContext();

    const { enqueueSnackbar } = useSnackbar();

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const theme = useTheme();
    
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleLogout = async () => {
        try {
            logout();
            replace(PATH_AUTH.login);
            handleClosePopover();
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Unable to logout!', { variant: 'error' });
        }
    };

    const handleClickItem = (path: string) => {
        handleClosePopover();
        push(path);
    };

    let accountPhoto = (
        <CustomAvatar sx={{ height: 24, width: 24 }} src={user?.photo} alt={user?.username} name={user?.username} />
    );
    if (!user?.photo) {
        accountPhoto = (
            
            <Box
                // sx={{
                    
                //     // WebkitBackgroundClip: 'text'
                //     // WebkitTextFillColor: 'transparent'
                // }}
            
                component={m.div}
                animate={{
                    // scale: [1, 1, 1, 1, 1],
                    rotate: [0, 360],
                    // opacity: [1, 1, 1, 1, 1],
                    // borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                }}
                transition={{
                    ease: 'linear',
                    duration: 10,
                    repeat: Infinity,
                }}
                sx={{
                    width: 24,
                    height: 24,
                    color: `-webkit-linear-gradient(${`300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`})`
                    // position: 'absolute',
                    // border: (theme) => `solid 1px ${alpha(theme.palette.primary.dark, 0.24)}`,
                }}
            >
                <Iconify icon="game-icons:orange" />
            </Box>
        );
    }

    return (
        <>
            <IconButtonAnimate
                onClick={handleOpenPopover}
                sx={{
                    p: 0,
                    ...(openPopover && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                {accountPhoto}
            </IconButtonAnimate>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.username}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user?.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    {OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                            {option.label}
                        </MenuItem>
                    ))}
                    <MenuItem>
                        <Link href={PATH_DOCS.root} style={{ textDecoration: 'none' }}>
                            Documentation
                        </Link>
                    </MenuItem>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </MenuPopover>
        </>
    );
}
