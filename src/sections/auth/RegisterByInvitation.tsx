// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterByInvitationForm from './AuthRegisterByInvitationForm';
//

// ----------------------------------------------------------------------

export default function Register() {
    return (
        <LoginLayout title="Improve your development process with CITROS">
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Get started with CITROS.</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2"> Already have an account? </Typography>

                    {/* <NextLink href={PATH_AUTH.login} passHref> */}
                    <Link component={NextLink} underline="none" href={PATH_AUTH.login} passHref variant="subtitle2">
                        Log in
                    </Link>
                    {/* </NextLink> */}
                </Stack>
            </Stack>

            <AuthRegisterByInvitationForm />

            <Typography
                component="div"
                sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
            >
                {'By signing up, I agree to '}
                <Link underline="always" color="text.primary">
                    Terms of Service
                </Link>
                {' and '}
                <Link underline="always" color="text.primary">
                    Privacy Policy
                </Link>
                .
            </Typography>

            {/* <AuthWithSocial /> */}
        </LoginLayout>
    );
}
