import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Button, Link, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import { HEADER } from '../../../config';
import Logo from '../../../components/logo';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import { useCommitEditorRoute } from 'src/components/repo/editor/CommitEditor';
import { useAuthContext } from 'src/auth/useAuthContext';
import Iconify from 'src/components/iconify';
import { IconButtonAnimate } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
    onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
    const theme = useTheme();

    const editorRoute = useCommitEditorRoute();

    const { user } = useAuthContext();

    const renderContent = (
        <>
            <Logo size={'small'} />

            <Box display={'flex'} alignItems={'center'} gap={-0.5} pl={2}>
                <Button color={'inherit'} sx={{ p: 1 }}>
                    <Link href={'/'}>
                        <Typography variant={'subtitle2'}>{user.organization.name}</Typography>
                    </Link>
                </Button>
                {editorRoute.repoName && (
                    <>
                        <Typography variant={'subtitle2'} sx={{ p: 1 }}>
                            /
                        </Typography>
                        <Button color={'inherit'} variant={'text'} sx={{ p: 1 }}>
                            <Link href={`/${editorRoute.repoName}`}>
                                <Typography variant={'subtitle2'}>{editorRoute.repoName}</Typography>
                            </Link>
                        </Button>
                    </>
                )}
            </Box>

            {/*{!isDesktop && (*/}
            {/*  <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>*/}
            {/*    <Iconify icon="eva:menu-2-fill" />*/}
            {/*  </IconButton>*/}
            {/*)}*/}

            <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
                <Tooltip title="Go To Documentation">
                    <Link href="https://citros.io/doc/" target="_blank">
                        <IconButtonAnimate
                            color={'default'}
                            // onClick={handleOpenPopover}
                            sx={{ width: 40, height: 40 }}
                        >
                            <Iconify icon="jam:document" />
                        </IconButtonAnimate>
                    </Link>
                </Tooltip>

                <NotificationsPopover />

                <AccountPopover />
            </Stack>
        </>
    );

    return (
        <AppBar
            position={'static'}
            sx={{
                boxShadow: 'none',
                height: HEADER.H_CITROS,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.header,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                // ...(isDesktop && {
                //     width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
                //     height: HEADER.H_DASHBOARD_DESKTOP,
                //     ...(isOffset && {
                //         height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                //     }),
                //     ...(isNavHorizontal && {
                //         width: 1,
                //         bgcolor: 'background.default',
                //         height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                //         borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
                //     }),
                //     ...(isNavMini && {
                //         width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
                //     }),
                // }),
            }}
        >
            <Toolbar>{renderContent}</Toolbar>
        </AppBar>
    );
}
