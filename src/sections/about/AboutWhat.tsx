import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, LinearProgress, Stack, Link } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fPercent } from '../../utils/formatNumber';
// _mock_
import { _skills } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
    const theme = useTheme();

    const isDesktop = useResponsive('up', 'md');

    const isLight = theme.palette.mode === 'light';

    const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

    const { push } = useRouter();

    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                <Grid container spacing={3}>
                    {isDesktop && (
                        <Grid item xs={12} md={3} lg={5} sx={{ pr: { md: 7 } }}>
                            <Grid container spacing={3} alignItems="flex-end">
                                <Box
                                    sx={{ width: '100%', height: '100%' }}
                                    component={m.div}
                                    variants={varFade().inDown}
                                >
                                    <Image
                                        sx={{ borderRadius: 1 }}
                                        disabledEffect
                                        alt="citros data analysis"
                                        src="/assets/images/home/illustration_analysis.png"
                                    />
                                    <Image
                                        sx={{ borderRadius: 1 }}
                                        disabledEffect
                                        alt="citros data analysis"
                                        src="/assets/images/home/illustration_explained.png"
                                    />
                                </Box>
                                {/* <Grid item xs={6}>
                                    <m.div variants={varFade().inUp}>
                                        <Image
                                            alt="our office 1"
                                            src="/assets/images/about/what_1.jpg"
                                            ratio="3/4"
                                            sx={{
                                                borderRadius: 2,
                                                boxShadow: shadow,
                                            }}
                                        />
                                    </m.div>
                                </Grid>
                                <Grid item xs={6}>
                                    <m.div variants={varFade().inUp}>
                                        <Image
                                            alt="our office 2"
                                            src="/assets/images/about/what_2.jpg"
                                            ratio="1/1"
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </m.div>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    )}

                    <Grid item xs={12} md={9} lg={7}>
                        <m.div variants={varFade().inRight}>
                            <Typography variant="h2" sx={{ mb: 3 }}>
                                What is CITROS?
                            </Typography>
                        </m.div>

                        <Box sx={{ my: 5 }}>
                            <m.div variants={varFade().inRight}>
                                <Stack spacing={2}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            // fontSize: 15,
                                            color: (theme) =>
                                                theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                                        }}
                                    >
                                        CITROS originated as an internal product developed by Lulav for the Beresheet 2
                                        project, which aims to send a second lunar lander to the moon in the near
                                        future. Lulav undertook the ambitious task of creating a vision-based navigation
                                        system for the moon, a seemingly straightforward endeavor that turned out to be
                                        far more complex than initially anticipated. Given the challenges of testing on
                                        the moon itself, the product needded to pass a series of Verification and
                                        Validation (V&V) tests on a simulation platform for both System and Acceptance
                                        tests.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            // fontSize: 15,
                                            color: (theme) =>
                                                theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                                        }}
                                    >
                                        After an extensive search for a product that could provide the necessary
                                        capabilities, Lulav developed CITROS.
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            // fontSize: 15,
                                            color: (theme) =>
                                                theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                                        }}
                                    >
                                        CITROS is a ROS2 cloud launcher that simplifies the process of launching
                                        multiple simulations in parallel and storing all the data in the cloud for
                                        collaboration and easy access. CITROS can be easily configured on any CI/CD
                                        pipeline using its powerful CLI tool, eliminating the burden of automation.
                                        Users can set up an automatic report generation process after each push or
                                        simply upon a webhook/API call. This report can be configured to function as a
                                        regression/system/acceptance test. As these reports can be generated manually or
                                        automatically for any changes, it becomes possible to continuously evaluate
                                        the entire system and track its progress over time.
                                    </Typography>
                                </Stack>
                            </m.div>
                        </Box>

                        <m.div variants={varFade().inRight}>
                            {/* <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                endIcon={<Iconify icon="ic:round-arrow-right-alt" width={24} />}
                                onClick={() => {
                                    push('https://lulav.space');
                                }}
                            >
                                Check out our work
                            </Button> */}

                            <Button
                                href="https://lulav.space"
                                target="_blank"
                                variant="outlined"
                                color="inherit"
                                size="large"
                                endIcon={<Iconify icon="ic:round-arrow-right-alt" width={24} />}
                            >
                                Read more about Lulav and its products.
                            </Button>
                        </m.div>
                    </Grid>
                </Grid>
            </Container>
        </StyledRoot>
    );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
    progress: {
        label: string;
        value: number;
    };
};

function ProgressItem({ progress }: ProgressItemProps) {
    const { label, value } = progress;
    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {fPercent(value)}
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
                    '&.MuiLinearProgress-determinate': { bgcolor: 'divider' },
                }}
            />
        </Box>
    );
}
