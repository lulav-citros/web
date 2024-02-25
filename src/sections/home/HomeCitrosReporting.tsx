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

export default function HomeCitrosReporting() {
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
                    comint soon
                </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
                <Typography
                    variant="h2"
                    sx={{
                        mt: 2,
                        mb: { md: 5 },
                    }}
                >
                    Reporting
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        // mb: { md: 5 },
                    }}
                >
                    Automate data analysis reports for continuous evaluation:
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        // mb: { md: 5 },
                    }}
                >
                    - Trigger automatic report generation and signing pushing to a branch/ PR etc.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        // mb: { md: 5 },
                    }}
                >
                    - Store reports within CITROS for easy access through the web UI.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        // mb: { md: 5 },
                    }}
                >
                    - Configure both public and private access for reports depending on your needs.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        mb: { md: 5 },
                    }}
                >
                    This feature makes it convenient to track your progress and assess your system’s performance over
                    time.
                </Typography>
            </m.div>

            {/* <m.div variants={varFade().inDown}> {VisitButton} </m.div> */}
        </Stack>
    );
}

// ----------------------------------------------------------------------

function Content() {
    return (
        <Box
            sx={{ width: '100%', height: '600px', overflow: 'scroll', borderRadius: 1 }}
            component={m.div}
            variants={varFade().inDown}
        >
            <Image disabledEffect alt="rocket" src="/assets/images/home/report.png" />
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
        href={'https://citros.io/doc/docs_data_analysis'}
        endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
        Go To Documentation
    </Button>
);
