import { useState } from 'react';
import * as Yup from 'yup';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
    Box,
    Link,
    Stack,
    Alert,
    IconButton,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import snackbar, { useSnackbar } from '../../components/snackbar';
import useWindowSize from 'src/hooks/useWindowSize';

// ----------------------------------------------------------------------

type FormValuesProps = {
    email: string;
    password: string;
    afterSubmit?: string;
};

export default function AuthLoginForm() {
    const { login } = useAuthContext();
    const [openDialog, setOpenDialog] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const windowSize = useWindowSize();
    const { enqueueSnackbar } = useSnackbar();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        if (windowSize.width && windowSize.width < 1000) {
            enqueueSnackbar('CITROS rurrently doesnt suport mobile devices. Please use a larger screen to login', {
                variant: 'error',
            });
            return;
        }

        try {
            await login(data.email, data.password);
        } catch (error) {
            console.error(error);

            reset();

            setError('afterSubmit', {
                ...error,
                message: error.message,
            });
        }
    };

    const onForgotPasswordClick = () => {
        setOpenDialog(true);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField InputLabelProps={{ shrink: true }} name="email" label="Email address" />

                <RHFTextField
                    InputLabelProps={{ shrink: true }}
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                {/* <NextLink href={PATH_AUTH.resetPassword} passHref> */}
                <Link
                    component={NextLink}
                    href={'#'}
                    onClick={onForgotPasswordClick}
                    passHref
                    variant="body2"
                    color="inherit"
                    underline="always"
                >
                    Forgot password?
                </Link>
                {/* TODO: */}
                {/* </NextLink> */}
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitSuccessful || isSubmitting}
                sx={{
                    bgcolor: 'text.primary',
                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    },
                }}
            >
                Login
            </LoadingButton>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <Box position="relative" sx={{ pb: 2 }}>
                    <DialogTitle>Forgot Password?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            We're here to help! For security reasons, if you've forgotten your password, please contact
                            our support team directly at
                            <br />
                            <Link href="#">support@citros.io</Link>
                            <br />
                            We aim to respond and assist you as soon as possible. We appreciate your understanding and
                            patience.
                        </DialogContentText>
                    </DialogContent>
                    <IconButton
                        style={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={() => setOpenDialog(false)}
                        aria-label="close"
                    >
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </Box>
            </Dialog>
        </FormProvider>
    );
}
