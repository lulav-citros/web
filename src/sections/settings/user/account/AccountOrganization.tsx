import * as Yup from 'yup';
import { useCallback } from 'react';
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

// ----------------------------------------------------------------------

type FormValuesProps = {
    organizationName: string;
    logo: CustomFile | string | null;
    domainPrefix: string;
    hostingType: string;
    organizationType: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    notDisabled: {
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: theme.palette.text.primary,
        },
    },
}));

export default function AccountOrganization() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useAuthContext();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });

    const defaultValues = {
        organizationName: user?.organization.name || '',
        logo: user?.logo || '',
        domainPrefix: user?.organization.domainPrefix || '',
        hostingType: user?.organization.hostingType || '',
        organizationType: user?.organization.type || '',
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
        console.log('onSubmit: ', data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('logo', newFile);
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {/* <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="logo"
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
          </Card>
        </Grid> */}

            <Grid item xs={12} md={8} mx={15}>
                <Card sx={{ p: 3 }}>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField
                            name="hostingType"
                            label="Hosting type"
                            disabled={true}
                            InputProps={{
                                classes: {
                                    disabled: classes.notDisabled,
                                },
                            }}
                        />
                        <RHFTextField
                            name="organizationType"
                            label="Organization Type"
                            disabled={true}
                            InputProps={{
                                classes: {
                                    disabled: classes.notDisabled,
                                },
                            }}
                        />
                    </Box>

                    <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                        <RHFTextField
                            name="organizationName"
                            disabled={true}
                            label="Name"
                            InputProps={{
                                classes: {
                                    disabled: classes.notDisabled,
                                },
                            }}
                        />

                        {/* <RHFTextField name="about" multiline rows={4} label="About" />s */}

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
