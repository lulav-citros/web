// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, BoxProps, Typography, Badge } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// routes
import { PATH_DOCS, PATH_MINIMAL_ON_STORE, PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';
// components
import Logo from '../../components/logo';
import Label from '../../components/label';
//
import NavMobile from './nav/mobile';
// import navConfig from './nav/config';
import { navConfig, navConfigAdmin } from './nav/config';
import NavDesktop from './nav/desktop';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function Header() {
    const theme = useTheme();

    // const { user } = useAuthContext();

    const isDesktop = useResponsive('up', 'md');

    const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

    let config = navConfig;
    // if (user && user.role == 'admin') {
    //     config = navConfigAdmin;
    // }

    return (
        <AppBar color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar
                disableGutters
                sx={{
                    height: {
                        xs: HEADER.H_MOBILE,
                        md: HEADER.H_MAIN_DESKTOP,
                    },
                    transition: theme.transitions.create(['height', 'background-color'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                    }),
                    ...(isOffset && {
                        ...bgBlur({ color: theme.palette.background.default }),
                        height: {
                            md: HEADER.H_MAIN_DESKTOP - 16,
                        },
                    }),
                }}
            >
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* <Logo /> */}
                    <Logo size={'small'} />

                    <Link href={PATH_DOCS.changelog} target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}>
                        {/* <Label color="info"> v4.0.0 </Label> */}
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />

                    {isDesktop && <NavDesktop isOffset={isOffset} data={config} />}

                    {/* <Button variant="contained" rel="noopener" href={PATH_AUTH.login}>
                        Log in
                    </Button> */}

                    <Badge color="warning" badgeContent="NEW">
                        {/* <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} /> */}
                        <Link
                            href="mailto:contact@citros.io?subject=Please tell me more about your enterprise plans."
                            sx={{
                                ':hover': {
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            <Typography variant="subtitle1">Enterprise</Typography>
                        </Link>
                    </Badge>

                    <Button
                        href="https://github.com/lulav-citros/citros"
                        target="_blank"
                        color="primary"
                        size="large"
                        sx={{ marginLeft: 4 }}
                    >
                        <Iconify icon="pajamas:github" width={34} height={34}></Iconify>
                    </Button>

                    <Badge color="warning" badgeContent="examples">
                        <Button href="https://github.com/citros-garden" target="_blank" color="success" size="large">
                            <Iconify icon="vscode-icons:folder-type-github-opened" width={34} height={34}></Iconify>
                        </Button>
                    </Badge>

                    <Button href="https://discord.gg/NUq89cvpsn" target="_blank" color="inherit" size="large">
                        <Iconify icon="ic:baseline-discord" width={34} height={34}></Iconify>
                    </Button>

                    {!isDesktop && <NavMobile isOffset={isOffset} data={config} />}
                </Container>
            </Toolbar>

            {isOffset && <Shadow />}
        </AppBar>
    );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
    return (
        <Box
            sx={{
                left: 0,
                right: 0,
                bottom: 0,
                height: 24,
                zIndex: -1,
                m: 'auto',
                borderRadius: '50%',
                position: 'absolute',
                width: `calc(100% - 48px)`,
                boxShadow: (theme) => theme.customShadows.z8,
                ...sx,
            }}
            {...other}
        />
    );
}
