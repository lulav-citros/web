import * as Yup from 'yup';
import { useCallback } from 'react';
// graphql
import { UPSERT_USER } from 'src/graphQL/user';
import getAppoloClinet from 'src/utils/connectAppolo';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Theme, styled, useTheme } from '@mui/material/styles';
import { ClassNameMap, makeStyles } from '@mui/styles';

// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { CustomFile } from '../../../../components/upload';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
// utils

// ----------------------------------------------------------------------

type FormValuesProps = {
    firstName: string;
    lastName: string;
    email: string;
};

type UpserUserProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organizationId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    notDisabled: {
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: theme.palette.text.primary,
        },
    },
}));

export default function AccountGeneral() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useAuthContext();

    const UpdateUserSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().required('Email is required'),
    });

    const defaultValues = {
        id: user?.id || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            let _user: UpserUserProps = {
                id: user?.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: user.email,
                organizationId: user?.organization.id,
            };
            if (_user) {
                _user.id = _user.id;
            }
            const client = getAppoloClinet();
            let resp = await client.mutate({
                variables: {
                    id: user?.id,
                    user: {
                        user: _user,
                    },
                },
                mutation: UPSERT_USER,
            });

            const dataFromClient = await resp;
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    // const handleDrop = useCallback(
    //     (acceptedFiles: File[]) => {
    //         const file = acceptedFiles[0];
    //         console.log('file:', file);

    //         const newFile = Object.assign(file, {
    //             preview: URL.createObjectURL(file),
    //         });

    //         if (file) {
    //             setValue('photo', newFile);
    //         }
    //     },
    //     [setValue]
    // );

    // const [upsertUser, { data: upsertUserData, error: upsertUserError }] = useMutation(UPSERT_USER);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            name="photo"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />

                        <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />
                    </Card>
                </Grid> */}

            <Grid item xs={12} md={8}>
                <Card sx={{ p: 3, mx: 15 }}>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        {/* <RHFTextField name="username" label="username" /> */}

                        <RHFTextField name="firstName" label="First Name" />
                        <RHFTextField name="lastName" label="Last Name" />

                        {/* <RHFTextField name="email" label="Email Address" /> */}

                        {/* <RHFTextField name="phone" label="Phone Number" /> */}

                        {/* <RHFSelect name="country" label="Country" placeholder="Country">
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect> */}

                        {/* <RHFTextField name="address" label="Address" />

                        <RHFTextField name="state" label="State/Region" />

                        <RHFTextField name="city" label="City" />

                        <RHFTextField name="zip" label="Zip/Code" /> */}
                    </Box>

                    <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                        {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}
                        <RHFTextField
                            name="email"
                            label="Email Address"
                            disabled={true}
                            InputProps={{
                                classes: {
                                    disabled: classes.notDisabled,
                                },
                            }}
                        />
                        {/* TODO: Add email change confirmation */}

                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Save Changes
                        </LoadingButton>
                    </Stack>
                </Card>
            </Grid>
            {/* </Grid> */}
        </FormProvider>
    );
}
