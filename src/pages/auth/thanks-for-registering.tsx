import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Button, Typography, Link } from '@mui/material';
import Image from '../../components/image';
// layouts
import CompactLayout from '../../layouts/compact';
// components
import { MotionContainer, varBounce } from '../../components/animate';
// assets
import { PageNotFoundIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

ThanksForRegistering.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

type Props = {
    illustration?: string;
};

export default function ThanksForRegistering({ illustration }: Props) {
    const router = useRouter();
    const { email, time } = router.query;
    var message = ' Please, check for verification link at ' + email;
    if (time == 'soon') {
        message = ' We will apply your account soon and contact you at ' + email;
    }

    return (
        <>
            <Head>
                <title> Thanks for registering</title>
            </Head>

            <MotionContainer>
                <m.div variants={varBounce().in}>
                    <Typography variant="h3" paragraph>
                        Thanks for registering
                    </Typography>
                </m.div>

                <m.div variants={varBounce().in}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Thank you for choosing CITROS. We are committed to providing you with the best experience
                        possible on our platform.
                        {message}
                    </Typography>
                </m.div>

                {/* <Image
                    disabledEffect
                    visibleByDefault
                    alt="auth"
                    src={illustration || '/assets/illustrations/illustration_dashboard.png'}
                    sx={{ maxWidth: 720 }}
                /> */}

                <Link component={NextLink} underline="none" href="/" passHref>
                    <Button size="large" variant="contained" sx={{ mt: 3 }}>
                        Go Back Home
                    </Button>
                </Link>
            </MotionContainer>
        </>
    );
}
