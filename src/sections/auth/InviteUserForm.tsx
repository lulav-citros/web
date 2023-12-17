import { Children, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Box,
    Divider,
    Drawer,
    Stack,
    Typography,
    Tooltip,
    IconButton,
    Button,
    ListItem,
    List,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '../../components/snackbar';

type FormValuesProps = {
    email: string;
    organizationId: string;
    afterSubmit?: string;
};

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    organizationId: Yup.string(),
});

export default function InviteUserForm({ onClose }: { onClose: () => void }) {
    const { enqueueSnackbar } = useSnackbar();
    const { user, registerUserByInvitation } = useAuthContext();
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<FormValuesProps | null>(null);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const defaultValues = {
        email: '',
        organizationId: user.organization.id,
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

    const onSubmit = (data: FormValuesProps) => {
        setFormData(data);
        handleOpenDialog();
    };

    const handleConfirmSubmit = async () => {
        try {
            if (registerUserByInvitation && formData) {
                await registerUserByInvitation(formData.email, user.organization.id);
            }
            enqueueSnackbar('User has been invited!');
            reset();
            handleCloseDialog();
            onClose();
        } catch (error) {
            console.error(error);
            reset();
            var errorMessage = error.message;
            if (error.message === 'duplicate key value violates unique constraint "user_email_key"') {
                enqueueSnackbar('Email already exists!', { variant: 'error' });
                setError('afterSubmit', {
                    ...error,
                    message: errorMessage,
                });
            } else {
                enqueueSnackbar('Error on server side', { variant: 'error' });
            }
        }
    };

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5} sx={{ p: 2 }}>
                    <RHFTextField
                        name="email"
                        label="Email address"
                        sx={{ width: { sm: 180, md: 250, minWidth: '100%' } }}
                    />

                    <LoadingButton
                        fullWidth
                        color="inherit"
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        sx={{
                            minWidth: '100%',
                            bgcolor: 'text.primary',
                            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                            '&:hover': {
                                bgcolor: 'text.primary',
                                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                            },
                            width: { sm: 180, md: 250 },
                        }}
                    >
                        Invite User
                    </LoadingButton>
                </Stack>
            </FormProvider>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to invite this user: <b>{formData?.email}</b>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSubmit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
