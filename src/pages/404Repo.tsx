import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography, Link } from '@mui/material';
// layouts
import CompactLayout from '../layouts/compact';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

Repo404.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Repo404() {
    return (
        <>
            <Head>
                <title> 404 Repo Not Found </title>
            </Head>

            <MotionContainer>
                <m.div variants={varBounce().in}>
                    <Typography variant="h3" paragraph>
                        Sorry, Repo not found!
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the repo you’re looking for. Perhaps you’ve mistyped the URL? Be sure to
                        check your spelling.
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <PageNotFoundIllustration
                        sx={{
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />
                </m.div>

                <Link component={NextLink} underline="none" href="/" passHref>
                    <Button size="large" variant="contained">
                        Go to Home
                    </Button>
                </Link>
            </MotionContainer>
        </>
    );
}
