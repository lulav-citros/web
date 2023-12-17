import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { IUserAccountChangePassword } from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { CHANGE_USER_PASSWORD } from 'src/graphQL/user';
import getAppoloClinet from 'src/utils/connectAppolo';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useMutation } from '@apollo/client';

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
    const { user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const ChangePassWordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old Password is required').min(8, 'Password must be at least 8 characters'),
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .min(8, 'Password must be at least 8 characters'),
    });

    const defaultValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            const client = getAppoloClinet();
            let resp = await client.mutate({
                variables: {
                    userId: user.id,
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                },
                mutation: CHANGE_USER_PASSWORD,
            });
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ mx: 15 }}>
                <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
                    <RHFTextField name="oldPassword" type="password" label="Old Password" />

                    <RHFTextField
                        name="newPassword"
                        type="password"
                        label="New Password"
                        helperText={
                            <Stack component="span" direction="row" alignItems="center">
                                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be at least 8
                                characters
                            </Stack>
                        }
                    />

                    <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Save Changes
                    </LoadingButton>
                </Stack>
            </Card>
        </FormProvider>
    );
}
