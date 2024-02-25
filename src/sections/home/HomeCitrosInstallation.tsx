import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack, Link } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_ZONE_ON_STORE } from '../../routes/paths';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import { TestStatusTypes } from 'src/@types/test';
import Terminal from 'src/components/code/Terminal';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    // // padding: theme.spacing(0, 0),
    // [theme.breakpoints.up('md')]: {
    //     padding: theme.spacing(5, 0),
    // },
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // backgroundImage: `url('/assets/background/overlay_4.jpg')`,
    // backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5, 0),
    },
}));

// ----------------------------------------------------------------------

export default function HomeCitrosInstallation() {
    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                {/* <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
                    Easy validation in a familuer environment.
                </Typography> */}
                <Typography variant="h1">Get started in seconds</Typography>

                <Grid container justifyContent="space-between">
                    {/* <Grid item xs={12} md={7}>
                        <TerminalContent />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Description />
                    </Grid> */}
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Terminal>
                                <code>pip install citros</code>
                            </Terminal>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                </Grid>
            </Container>
        </StyledRoot>
    );
}

// ----------------------------------------------------------------------
