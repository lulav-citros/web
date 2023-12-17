import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_FREE_VERSION, PATH_AUTH } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    position: 'relative',
    ...bgGradient({
        color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
        imgUrl: '/assets/background/overlay_2.jpg',
    }),
    [theme.breakpoints.up('md')]: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        position: 'fixed',
    },
}));

const StyledDescription = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: theme.spacing(15, 0),
    height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
    ...textGradient(
        `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
    ),
    backgroundSize: '400%',
    fontFamily: 'lato',
    // fontSize: `${64 / 16}rem`,
    fontWeight: 300,
    fontSize: 100,
    textAlign: 'center',
    lineHeight: 1,
    padding: 0,
    marginTop: 8,
    marginBottom: 24,
    letterSpacing: 8,
    // [theme.breakpoints.up('md')]: {
    //   fontSize: `${96 / 16}rem`,
    // },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: 480,
    height: 480,
    top: -80,
    right: -80,
    borderRadius: '50%',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
    position: 'absolute',
    height: 400,
    bottom: -200,
    left: '10%',
    right: '10%',
    borderRadius: '50%',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeCitros() {
    const isDesktop = useResponsive('up', 'md');

    const { scrollYProgress } = useScroll();

    const [hide, setHide] = useState(false);

    // useEffect(
    //     () =>
    //         scrollYProgress.onChange((scrollHeight) => {
    //             if (scrollHeight > 0.8) {
    //                 setHide(true);
    //             } else {
    //                 setHide(false);
    //             }
    //         }),
    //     [scrollYProgress]
    // );

    if (hide) {
        return null;
    }

    return (
        <>
            <StyledRoot>
                <Container component={MotionContainer} sx={{ height: 1 }}>
                    <Grid container sx={{ height: 1 }}>
                        {/* <Grid item xs={1} md={3}>
                            <ContentSmall />
                        </Grid> */}
                        {/* <ContentSmall /> */}

                        <Grid item xs={12} md={5} sx={{ height: 1, paddingLeft: 3 }}>
                            <Description />
                        </Grid>

                        {isDesktop && (
                            <Grid item xs={12} md={4}>
                                <Content />
                            </Grid>
                        )}
                    </Grid>
                </Container>

                <StyledEllipseTop />

                <StyledEllipseBottom />
            </StyledRoot>

            <Box sx={{ height: { md: '100vh' } }} />
        </>
    );
}

// ----------------------------------------------------------------------

function Description() {
    return (
        <StyledDescription>
            {/* <m.div variants={varFade().in}>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                    Develop your ROBOT with
                </Typography>
            </m.div> */}

            <m.div variants={varFade().in}>
                <StyledGradientText
                    animate={{ backgroundPosition: '200% center' }}
                    transition={{
                        repeatType: 'reverse',
                        ease: 'linear',
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    CITROS
                </StyledGradientText>
            </m.div>

            <m.div variants={varFade().in}>
                <Typography variant="body1" sx={{ textAlign: 'center', fontSize: 25 }}>
                    Cloud-based robotics development platform that empowers engineers to build better robots faster,
                    with streamlined data management, powerful analysis tools, and automated reporting.
                </Typography>
            </m.div>

            <m.div variants={varFade().in}>
                <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 5 }}>
                    <Stack alignItems="center" spacing={2}>
                        <Link component={NextLink} underline="none" href={PATH_AUTH.login} passHref>
                            <Button
                                color="inherit"
                                size="large"
                                variant="contained"
                                startIcon={<Iconify icon="eva:flash-fill" width={24} />}
                                sx={{
                                    bgcolor: 'text.primary',
                                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                                    '&:hover': {
                                        bgcolor: 'text.primary',
                                    },
                                }}
                            >
                                Log in
                            </Button>
                        </Link>
                    </Stack>

                    <Button
                        color="inherit"
                        size="large"
                        variant="outlined"
                        startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
                        // target="_blank"
                        rel="noopener"
                        href={PATH_AUTH.register}
                        sx={{ borderColor: 'text.primary' }}
                    >
                        Get started
                    </Button>
                </Stack>
            </m.div>
        </StyledDescription>
    );
}

// ----------------------------------------------------------------------

function Content() {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    const transition = {
        repeatType: 'loop',
        ease: 'linear',
        duration: 60 * 4,
        repeat: Infinity,
    } as const;

    return (
        <Stack
            direction="row"
            alignItems="flex-start"
            sx={{
                height: 1,
                overflow: 'hidden',
                position: 'absolute',
                mt: `${HEADER.H_MAIN_DESKTOP}px`,
            }}
        >
            <Stack component={m.div} variants={varFade().in} sx={{ width: 344, position: 'relative' }}>
                <Box
                    component={m.img}
                    animate={{ y: ['0%', '100%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
                    sx={{ position: 'absolute' }}
                />
                <Box
                    component={m.img}
                    animate={{ y: ['-100%', '0%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
                    sx={{ position: 'absolute' }}
                />
            </Stack>

            <Stack component={m.div} variants={varFade().in} sx={{ width: 720, position: 'relative', ml: -2 }}>
                <Box
                    component={m.img}
                    animate={{ y: ['100%', '0%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
                    sx={{ position: 'absolute' }}
                />
                <Box
                    component={m.img}
                    animate={{ y: ['0%', '-100%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
                    sx={{ position: 'absolute' }}
                />
            </Stack>
        </Stack>
    );
}

function ContentSmall() {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    const transition = {
        repeatType: 'loop',
        ease: 'linear',
        duration: 60 * 4,
        repeat: Infinity,
    } as const;

    return (
        <Stack
            direction="row"
            alignItems="flex-start"
            sx={{
                height: 1,
                overflow: 'hidden',
                position: 'absolute',
                mt: `${HEADER.H_MAIN_DESKTOP}px`,
            }}
        >
            <Stack component={m.div} variants={varFade().in} sx={{ width: 344, position: 'relative' }}>
                <Box
                    component={m.img}
                    animate={{ y: ['1000%', '0%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
                    sx={{ position: 'absolute' }}
                />
                <Box
                    component={m.img}
                    animate={{ y: ['0%', '-100%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
                    sx={{ position: 'absolute' }}
                />
            </Stack>

            {/* <Stack component={m.div} variants={varFade().in} sx={{ width: 720, position: 'relative', ml: -2 }}>
                <Box
                    component={m.img}
                    animate={{ y: ['100%', '0%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
                    sx={{ position: 'absolute' }}
                />
                <Box
                    component={m.img}
                    animate={{ y: ['0%', '-100%'] }}
                    transition={transition}
                    src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
                    sx={{ position: 'absolute' }}
                />
            </Stack> */}
        </Stack>
    );
}
