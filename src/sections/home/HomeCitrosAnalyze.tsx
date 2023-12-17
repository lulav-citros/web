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
import { TestStatusTypes } from 'src/@types/test';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, 0),
    },
}));

// const StyledRoot = styled('div')(({ theme }) => ({
//     textAlign: 'center',
//     padding: theme.spacing(10, 0),
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center center',
//     backgroundImage: `url('/assets/background/overlay_1.svg')`,
//     [theme.breakpoints.up('md')]: {
//         padding: theme.spacing(20, 0),
//     },
// }));

// ----------------------------------------------------------------------

export default function HomeCitrosAnalyze() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 5, md: 0 }}>
                    <Grid item xs={12} md={7}>
                        <Content />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Description />
                    </Grid>

                    {!isDesktop && (
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            {VisitButton}
                        </Grid>
                    )}
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
                    Analyze
                </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
                <Typography
                    variant="h2"
                    sx={{
                        mt: 3,
                        // mb: { md: 5 },
                    }}
                >
                    Verification & Validation 
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        // mb: { md: 5 },
                    }}
                >
                    Harness the power of the <b>citros-data-analysis</b> package:
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        // mb: { md: 5 },
                    }}
                >
                    - Analyze and <b>query</b> data stored in the cloud seamlessly.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        // mb: { md: 5 },
                    }}
                >
                    - Perform <b>error estimation</b> and <b>validation</b>.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        // mb: { md: 5 },
                    }}
                >
                    - Integrate effortlessly with any <b>Python notebooks</b> environment.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        // mb: { md: 5 },
                    }}
                >
                    - Leverage <b>CITROS</b> built-in Python notebook environment for immediate access.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        mb: { md: 5 },
                    }}
                >
                    This dedicated package streamlines data analysis, validation and verification for valuable insights.
                </Typography>
            </m.div>

            {isDesktop && <m.div variants={varFade().inDown}> {VisitButton} </m.div>}
        </Stack>
    );
}

// ----------------------------------------------------------------------

function Content() {
    return (
        <Box sx={{ width: '100%', height: '100%' }} component={m.div} variants={varFade().inDown}>
            <Image sx={{ borderRadius: 1 }} disabledEffect alt="citros data analysis" src="/assets/images/home/analysis-nb1.png" />
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
        href={'https://citros.io/doc/docs_data_analysis/next/validation/getting_started'}
        endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
        Go To Documentation
    </Button>
);
