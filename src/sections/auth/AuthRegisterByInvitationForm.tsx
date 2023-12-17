import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';

import FormProvider, { RHFTextField } from '../../components/hook-form';
import { UserUpdateRequest } from 'src/auth/types';
import { RegisterSchema } from './consts';

// ----------------------------------------------------------------------

type FormValuesProps = {
    id: string;
    password: string;
    repeatPassword: string;
    firstName: string;
    lastName: string;
    afterSubmit?: string;
};

export default function AuthRegisterByInvitationForm() {
    const router = useRouter();
    const id = router.query.id as string;
    const { verifyUserByInvitation } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);

    const defaultValues = {
        id: id,
        firstName: '',
        lastName: '',
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
        console.log('Submitting form with data');

        try {
            if (verifyUserByInvitation) {
                const userUpdateRequest: UserUpdateRequest = {
                    id: id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                };

                await verifyUserByInvitation(userUpdateRequest);
            }
        } catch (error) {
            console.error('Error while inviting user:', error);

            reset();
            setError('afterSubmit', {
                type: 'manual',
                message: 'Error while inviting user',
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

                <RHFTextField
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
