import { ComponentType, ReactNode, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import * as Yup from 'yup';
// @mui
import { Theme, alpha, useTheme } from '@mui/material/styles';
import { ClassNameMap, makeStyles } from '@mui/styles';
import { Box, Drawer, Divider, Stack, Typography, Tooltip, IconButton } from '@mui/material';
import Iconify from '../iconify';
import { bgBlur } from '../../utils/cssStyles';
// ----------------------------------------------------------------------

const SPACING = 2.5;

type DrawerProps = {
    // MainChildren: ComponentType;
    NavChildren: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultDrawerWidth?: number;
    minDrawerWidth?: number;
    maxDrawerWidth?: number;
    mainChildrenProps?: { [key: string]: unknown };
    innerSx?: Record<string, any>;
    backgroundBlur?: boolean;
    backgroundBlurbackgroundColor?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    dragger: {
        width: '10px',
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid #ddd',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        opacity: 0,
    },
    drawer: {
        flexShrink: 0,
        marginRight: 'auto',
    },
}));

export default function DraggableDrawer({
    open,
    setOpen,
    children,
    NavChildren,
    defaultDrawerWidth = 360,
    minDrawerWidth = 360,
    maxDrawerWidth = 360,
    mainChildrenProps = {},
    innerSx,
    backgroundBlur = true,
    backgroundBlurbackgroundColor = 'rgba(0,0,0,0.5)',
}: PropsWithChildren<DrawerProps>) {
    const classes = useStyles();
    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
    const [draggerWidth, setDraggerWidth] = useState(10);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        document.addEventListener('mouseup', handleMouseUp, true);
        document.addEventListener('mousemove', handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp, true);
        document.removeEventListener('mousemove', handleMouseMove, true);
        setDraggerWidth(10);
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const newWidth = document.body.offsetWidth - e.clientX;
            if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
                setDrawerWidth(newWidth);
                setDraggerWidth(newWidth);
            }
        },
        [minDrawerWidth, maxDrawerWidth]
    );

    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    const handleDrawerClose = (event: {}, reason: string) => {
        if (backgroundBlur || reason !== 'backdropClick') {
            handleClose();
        }
    };

    useEffect(() => {
        if (backgroundBlur && open) {
            document.body.style.overflow = 'hidden'; // prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // allow scrolling
        }

        // Cleanup
        return () => {
            document.body.style.overflow = 'auto'; // reset to allow scrolling when component is unmounted
        };
    }, [backgroundBlur, open]);

    return (
        <Drawer
            className={classes.drawer}
            PaperProps={{
                style: {
                    width: drawerWidth,
                    backgroundColor: theme.palette.background.default,
                },
            }}
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                style: {
                    position: 'absolute',
                    width: backgroundBlur ? '100%' : drawerWidth,
                    left: backgroundBlur ? 0 : `calc(100% - ${drawerWidth}px)`,
                    overflow: backgroundBlur ? 'hidden' : 'auto',
                },
                keepMounted: true,
                BackdropProps: {
                    style: {
                        backgroundColor: backgroundBlur ? backgroundBlurbackgroundColor : 'transparent',
                        width: backgroundBlur ? '100%' : drawerWidth,
                        left: backgroundBlur ? 0 : `calc(100% - ${drawerWidth}px)`,
                        height: '100vh',
                    },
                },
            }}
        >
            {(defaultDrawerWidth !== minDrawerWidth ||
                maxDrawerWidth !== minDrawerWidth ||
                defaultDrawerWidth !== maxDrawerWidth) && (
                <div
                    onMouseDown={(e) => handleMouseDown(e)}
                    className={classes.dragger}
                    style={{ width: draggerWidth }}
                />
            )}
            <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ py: 2, pr: 1, pl: SPACING }}
                    >
                        {NavChildren}
                        <IconButton onClick={handleClose}>
                            <Iconify icon="eva:close-fill" />
                        </IconButton>
                    </Stack>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                </Box>
                <Box sx={{ ...innerSx, flex: 1, overflowY: 'auto' }}>{children}</Box>
            </Box>
        </Drawer>
    );
}
