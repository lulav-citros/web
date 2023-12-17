import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import Logo from '../../components/logo';
// ----------------------------------------------------------------------

const CARDS = [
    {
        // icon: ' /assets/icons/home/ic_make_brand.svg',
        icon: ' /assets/icons/home/ros-dark.png',
        title: 'ROS',
        description: 'Out of the box ROS support. never loose your data again.',
        width: 48,
        height: 48,
    },
    {
        // icon: ' /assets/icons/home/ic_design.svg',
        icon: ' /assets/icons/home/cicd.png',
        title: 'CI/CD',
        description:
            'Reduce your develop time, increate system validation and code quality by automating your robotic system CI/CD flow.',
        width: 90,
        height: 48,
    },
    {
        // icon: ' /assets/icons/home/ic_development.svg',
        icon: ' /assets/icons/home/jpn.png',
        title: 'Validation',
        description:
            'Benefit the power of Python to Validate your simulated data using python notebook like environment. Convert your notebook to a full testing report by automating the test scenarios.',
    },
];

const StyledRoot = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    padding: theme.spacing(10, 5),
    [theme.breakpoints.up('md')]: {
        boxShadow: 'none',
    },
}));

// ----------------------------------------------------------------------

export default function HomeCitrosExplain() {
    return (
        <StyledRoot>
            <Container component={MotionViewport}>
                <Stack
                    spacing={3}
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 5, md: 10 },
                    }}
                >
                    <m.div variants={varFade().inUp}>
                        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                            What
                        </Typography>
                    </m.div>

                    <m.div variants={varFade().inDown}>
                        <Typography variant="h2">
                            How <Logo /> helps you?
                        </Typography>
                    </m.div>
                </Stack>

                <Box
                    gap={{ xs: 3, lg: 10 }}
                    display="grid"
                    alignItems="center"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        md: 'repeat(3, 1fr)',
                    }}
                >
                    {CARDS.map((card, index) => (
                        <m.div variants={varFade().inUp} key={card.title}>
                            <StyledCard
                                sx={{
                                    ...(index === 1 && {
                                        boxShadow: (theme) => ({
                                            md: `-40px 40px 80px ${
                                                theme.palette.mode === 'light'
                                                    ? alpha(theme.palette.grey[500], 0.16)
                                                    : alpha(theme.palette.common.black, 0.4)
                                            }`,
                                        }),
                                    }),
                                }}
                            >
                                <Image
                                    src={card.icon}
                                    alt={card.title}
                                    sx={{ mx: 'auto', width: card.width ?? 48, height: card.height ?? 48 }}
                                />

                                <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                                    {card.title}
                                </Typography>

                                <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
                            </StyledCard>
                        </m.div>
                    ))}
                </Box>
            </Container>
        </StyledRoot>
    );
}
