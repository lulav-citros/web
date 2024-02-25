import { m, useScroll, useSpring } from 'framer-motion';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import LandingPageLayout from '../layouts/landingPage';
import {
    HomeCitros,
    HomeCitrosExplain,
    HomeCitrosPN,
    HomeCitrosExample,
    HomeCitrosDA,
    HomeLookingFor,
    HomePricingPlans,
    HomeCleanInterfaces,
    HomeAdvertisement,
    HomeColorPresets,
} from '../sections/home';

import { getCookies, getCookie, setCookie, deleteCookie, CookieValueTypes } from 'cookies-next';
import { boolean } from 'yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HomeCitrosCollect from 'src/sections/home/HomeCitrosCollect';
import HomeCitrosStore from 'src/sections/home/HomeCitrosStore';
import HomeCitrosAccess from 'src/sections/home/HomeCitrosAccess';
import HomeCitrosAnalyze from 'src/sections/home/HomeCitrosAnalyze';
import HomeCitrosReporting from 'src/sections/home/HomeCitrosReporting';
import HomeCitrosGetStarted from 'src/sections/home/HomeCitrosGetStarted';
import HomeCitrosInstallation from 'src/sections/home/HomeCitrosInstallation';

export default function HomePage() {
    const router = useRouter();

    const theme = useTheme();

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const progress = (
        <m.div
            style={{
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                zIndex: 1999,
                position: 'fixed',
                transformOrigin: '0%',
                backgroundColor: theme.palette.primary.main,
                scaleX,
            }}
        />
    );

    return (
        <LandingPageLayout>
            <>
                <Head>
                    <title> CITROS </title>
                </Head>

                {progress}

                <HomeCitros />

                <Box
                    sx={{
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: 'background.default',
                    }}
                >
                    {/* <HomePricingPlans /> */}

                    {/* <HomeHugePackElements /> */}

                    {/* <HomeForDesigner /> */}
                    <HomeCitrosInstallation />
                    <HomeCitrosGetStarted />
                    <HomeCitrosCollect />
                    <HomeCitrosStore />
                    <HomeCitrosAccess />
                    <HomeCitrosAnalyze />
                    <HomeCitrosReporting />

                    {/* <HomeCitrosPN /> */}
                    {/* <HomeCitrosExplain /> */}
                    {/* <HomeCitrosExample /> */}
                    {/* <HomeCitrosDA /> */}
                    {/* <HomeColorPresets />

                    <HomeAdvertisement /> */}
                </Box>
            </>
        </LandingPageLayout>
    );
}
