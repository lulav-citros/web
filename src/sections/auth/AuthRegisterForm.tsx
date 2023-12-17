import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Typography, Checkbox, Link, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
    email: string;
    password: string;
    repeatPassword: string;
    firstName: string;
    lastName: string;
    organization: string;
    slug: string;
    afterSubmit?: string;
};

export default function AuthRegisterForm() {
    const { register } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string()
            .email('Email must be a valid email address')
            .required('Email is required')
            .lowercase('Email must be lowercase'),
        organization: Yup.string().required('Organization or Company is required'),
        slug: Yup.string()
            .required('Organization Domain Prefix is required')
            .matches(/^[a-z, 0-9]+$/, 'Organization Domain Prefix can contain only lowercase leters and numbers'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        repeatPassword: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        slug: '',
        password: '',
        repeatPassword: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (register) {
                await register(data.email, data.password, data.firstName, data.lastName, data.organization, data.slug);
            }
        } catch (error) {
            console.error(error);

            reset();
            var errorMessage = error.message;
            if (error.message == `null value in column "user_id" of relation "user" violates not-null constraint`) {
                errorMessage = 'Email already exist';
            } else if (error.message == `duplicate key value violates unique constraint "organization_name_key"`) {
                errorMessage = `Organization already exists. Please contact  your organization's administrator`;
            } else if (
                error.message == `duplicate key value violates unique constraint "organization_domain_prefix_key"`
            ) {
                errorMessage = `Organization domain prefix already exists. Please contact  your organization's administrator`;
            }

            setError('afterSubmit', {
                ...error,
                message: errorMessage,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>

                <RHFTextField InputLabelProps={{ shrink: true }} name="email" label="Email address" />

                <RHFTextField name="organization" label="Organization or Company" />

                <Tooltip
                    children={<RHFTextField name="slug" label="Organization slug" />}
                    title={'*lower case, *no spaces, *no numbers on fist char'}
                    placement="right"
                />

                <RHFTextField
                    InputLabelProps={{ shrink: true }}
                    autoComplete="password"
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

                <RHFTextField
                    name="repeatPassword"
                    label="Repeat Password"
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

                <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        '&:hover': {
                            bgcolor: 'text.primary',
                            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        },
                    }}
                >
                    Create account
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
