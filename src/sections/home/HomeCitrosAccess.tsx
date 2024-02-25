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
    // padding: theme.spacing(10, 0),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // backgroundImage: `url('/assets/background/overlay_1.svg')`,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, 0),
    },
}));

// ----------------------------------------------------------------------

export default function HomeCitrosAccess() {
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
                        {/* <Content1 /> */}
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
                    Access
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
                    Query data
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        mb: { md: 5 },
                    }}
                >
                    CITROS provides seamless access to all recorded simulated data directly from the recorded bags, or
                    trough a <b>postgres</b> database that will give the power of queuing the data you need in ease.
                    CITROS comes with a data analysis package that will expose all the necessary tools to analyze the
                    data using python. Uncover insights effortlessly with CITROS's using python notebooks.
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
            <Code
                language={'python'}
                children={
                    "from citros import CitrosDB  \n\
citros = CitrosDB(simulation = 'simulaiton_1', batch='first_run')  \n\
citros.\n\
    topic('/cannon/state').\n\
    sid([1,2]).\n\
    xy_plot(ax, var_x_name = 'data.data[0]',\n\
        var_y_name = 'data.data[1]', \n\
        x_label = 'x', \n\
        y_label = 'y', \n\
        title_text = 'y vs. x') "
                }
            ></Code>
            <Image disabledEffect alt="rocket" src="/assets/images/home/access.png" />
        </Box>
    );
}

function Content1() {
    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }} component={m.div} variants={varFade().inDown}>
            <Image
                sx={{ width: '80%', borderRadius: 1 }}
                disabledEffect
                alt="rocket"
                src="/assets/images/home/access-ui.png"
            />
            <Image
                sx={{ width: '80%', position: 'absolute', top: 40, right: -40, borderRadius: 1 }}
                disabledEffect
                alt="rocket"
                src="/assets/images/home/analysis-nb.png"
            />
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
        href={'https://citros.io/doc/docs_data_analysis/next/data_access/getting_started'}
        endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
        Go To Documentation
    </Button>
);
