// next
import NextLink from 'next/link';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
    const { method } = useAuthContext();

    return (
        <LoginLayout>
            <Stack spacing={2} sx={{ mb: 5 }}>
                <Typography variant="h4">Log in</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">New user?</Typography>

                    {/* <NextLink href={PATH_AUTH.register} passHref> */}
                    <Link component={NextLink} underline="none" href={PATH_AUTH.register} passHref variant="subtitle2">
                        Create an account
                    </Link>
                    {/* </NextLink> */}
                </Stack>
            </Stack>

            {/* <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}

            <AuthLoginForm />

            {/* <AuthWithSocial /> */}
        </LoginLayout>
    );
}
