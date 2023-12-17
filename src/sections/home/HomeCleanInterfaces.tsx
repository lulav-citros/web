import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}));

// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                <Description />
                <Grid item xs={12} md={7}>
                    <Content />
                </Grid>
            </Container>
        </StyledRoot>
    );
}

// ----------------------------------------------------------------------

function Description() {
    return (
        <Stack
            spacing={3}
            sx={{
                maxWidth: 520,
                mx: 'auto',
                zIndex: { md: 9 },
                position: { md: 'relative' },
                textAlign: { xs: 'center', md: 'left' },
            }}
        >
            <m.div variants={varFade().inUp}>
                <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                    ROS2 and much more
                </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
                <Typography
                    variant="h2"
                    sx={{
                        textShadow: (theme) =>
                            theme.palette.mode === 'light'
                                ? 'unset'
                                : `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }}
                >
                    Explore ROS features with CITROS
                </Typography>
            </m.div>
        </Stack>
    );
}

// ----------------------------------------------------------------------

function Content() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                zIndex: { md: 10 },
                mt: { xs: 2, sm: 3 },
            }}
            component={m.div}
            variants={varFade().inUp}
        >
            <Image disabledEffect alt="rocket" src="/assets/images/home/illustration_explained.png" />
        </Box>
    );
}
