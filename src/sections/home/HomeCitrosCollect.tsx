import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_ZONE_ON_STORE } from '../../routes/paths';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import Code from 'src/components/code/Code';

// ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//     padding: theme.spacing(10, 0),
//     [theme.breakpoints.up('md')]: {
//         padding: theme.spacing(10, 0),
//     },
// }));

const StyledRoot = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(10, 0),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // backgroundImage: `url('/assets/background/overlay_1.svg')`,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, 0),
    },
}));

// ----------------------------------------------------------------------

export default function HomeCitrosCollect() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 5, md: 0 }}>
                    <Grid item xs={12} md={4}>
                        <Description />
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Content />
                    </Grid>
                </Grid>
            </Container>
        </StyledRoot>
    );
}

// ----------------------------------------------------------------------

function Description() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <Stack
            sx={{
                textAlign: {
                    xs: 'center',
                    md: 'left',
                },
            }}
        >
            <m.div variants={varFade().inDown}>
                <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
                    Collecting
                </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
                <Typography
                    variant="h2"
                    sx={{
                        mt: 3,
                    }}
                >
                    Run Simulation
                </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 3,
                        mb: { md: 2 },
                    }}
                >
                    Launching Simulations and Collecting Data with citros run
                </Typography>

                <Code language={'python'} children={'citros run'}></Code>

                <Typography
                    variant="body1"
                    sx={{
                        mt: 3,
                        mb: { md: 5 },
                    }}
                >
                    The citros run command is a powerful tool that enables you to effortlessly launch simulations and
                    collect data from a local machine or a remote one. This command seamlessly integrates into any CI/CD
                    pipeline, making CITROS an invaluable tool for robotics DevOps.
                </Typography>
            </m.div>

            <m.div variants={varFade().inDown}> {VisitButton} </m.div>
        </Stack>
    );
}

// ----------------------------------------------------------------------

function Content() {
    return (
        <Box sx={{ width: '100%', height: '100%' }} component={m.div} variants={varFade().inDown}>
            <Box
                sx={{ width: '100%', height: '100%', borderRadius: 1, overflow: 'hidden', border: '0.1px solid grey' }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '40px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderBottom: '0.1px solid grey',
                    }}
                >
                    <Stack direction={'row'}>
                        <Box sx={{ pt: 1, pl: 1 }}>
                            <svg width={20} height={20} viewBox="0px 0px 20px 20px" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10px" cy="10px" r="8px" fill="#ff5f57" />
                            </svg>
                        </Box>
                        <Box sx={{ pt: 1, pl: 0.5 }}>
                            <svg width={20} viewBox="0px 0px 20px 20px" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10px" cy="10px" r="8px" fill="#fdbc2c" />
                            </svg>
                        </Box>
                        <Box sx={{ pt: 1, pl: 0.5 }}>
                            <svg
                                width={20}
                                viewBox="0px 0px 20px 20px"
                                fill="#28c840"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="10px" cy="10px" r="8px" />
                            </svg>
                        </Box>
                    </Stack>
                </Box>
                <Image disabledEffect alt="rocket" src="/assets/images/home/gifs/collect.gif" />
            </Box>
        </Box>
    );
}

const VisitButton = (
    <Button
        color="inherit"
        size="large"
        variant="outlined"
        target="_blank"
        rel="noopener"
        href={'https://docs.citros.io/docs/general/quickstart'}
        endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
        Go To Documentation
    </Button>
);
