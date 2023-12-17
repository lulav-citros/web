// @mui
import { Typography, Stack, Grid, Box } from '@mui/material';
import { m, useScroll } from 'framer-motion';

// components
import Logo from '../../components/logo';
import Image from '../../components/image';
import { styled, alpha, useTheme } from '@mui/material/styles';

//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import useResponsive from '../../hooks/useResponsive';
import { MotionContainer, varFade } from '../../components/animate';
import { HEADER } from '../../config';
// ----------------------------------------------------------------------

type Props = {
    title?: string;
    illustration?: string;
    children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
    // const isDesktop = useResponsive('up', 'md');
    return (
        <StyledRoot>
            <StyledSection sx={{ overflow: 'hidden' }}>
                <Grid container spacing={1} sx={{ height: 1 }}>
                    <Grid item xs={12} md={6} sx={{ height: 1 }}>
                        <Box sx={{ minWidth: 700 }}>
                            <Stack>
                                <Box sx={{ minWidth: 700, pt: 20, pl: 20, pr: 20, overflow: 'hidden' }}>
                                    <Logo />
                                    <Typography variant="h3" sx={{ textAlign: 'left', pt: 5 }}>
                                        {title || 'Hi, Welcome back'}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        pt: 3,
                                        pl: 20,
                                        pr: 20,

                                        minWidth: 700,
                                        zIndex: 1000,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: 0.5,
                                            borderColor: 'grey.700',
                                            borderRadius: 1,
                                            p: 3,
                                            backgroundColor: 'grey.900',
                                        }}
                                    >
                                        {children}
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* {isDesktop && ( */}
                    <Grid item xs={12} md={6}>
                        <Content />
                    </Grid>
                    {/* )} */}
                </Grid>

                <StyledSectionBg />
            </StyledSection>
        </StyledRoot>
    );
}

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
                // mt: `${HEADER.H_MAIN_DESKTOP}px`,
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

            <Stack component={m.div} variants={varFade().in} sx={{ width: 344, position: 'relative', ml: -2 }}>
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
