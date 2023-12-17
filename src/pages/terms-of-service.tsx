// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock/arrays';
// layouts
import SimpleLayout from '../layouts/simple';
// sections

// ----------------------------------------------------------------------

TermsOfService.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function TermsOfService() {
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
                    TODO: Terms of Service
                    
                </Typography>
            </Container>
        </>
    );
}
