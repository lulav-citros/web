// next
import Head from 'next/head';
// @mui
import { Box, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock/arrays';
// layouts
import SimpleLayout from '../layouts/simple';
// sections
import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

PrivacyPolicy.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title> Terms Of Service</title>
            </Head>

            <Container
                sx={{
                    pt: 15,
                    pb: 10,
                    minHeight: 1,
                }}
            >
                <Typography variant="h3" align="center" paragraph>
                    TODO: Privacy Policy
                    
                </Typography>
            </Container>
        </>
    );
}
