import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { CREATE_SSH_KEY } from 'src/graphQL/sshKeys';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';

const addKeySchema = Yup.object().shape({
    title: Yup.string().matches(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/, 'Invalid title format. Cant use special chars').required('Title is required'),
    key: Yup.string()
        .matches(
            /^(ssh-rsa|ssh-dss|ecdsa-sha2-nistp256|ecdsa-sha2-nistp384|ecdsa-sha2-nistp521|ssh-ed25519|sk-ssh-ed25519@openssh.com|sk-ecdsa-sha2-nistp256@openssh.com) [A-Za-z0-9+/]+[=]{0,3}( .*)?$/,
            'Invalid SSH Key format'
        )
        .required('SSH Key is required'),
});

type FormValuesProps = {
    key: string;
    title: string;
};

type Props = {
    refetch: () => void;
};

export function SSHKeyNewDialog({ refetch }: Props) {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [createSSHKey, { loading: createLoading, error: createError }] = useMutation(CREATE_SSH_KEY);
    const { user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = {
        key: '',
        title: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(addKeySchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<FormValuesProps> = async (data: { key: string; title: string }) => {
        // console.log('data', data);
        try {
            await createSSHKey({
                variables: {
                    userId: user?.id,
                    title: data.title,
                    key: data.key,
                },
            });
            reset();
            enqueueSnackbar('SSH Key added successfully!', { variant: 'success' });
            setOpenAddDialog(false);
            refetch();
        } catch (err) {
            console.error('Error adding SSH Key:', err);
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    return (
        <>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
            >
                <DialogTitle>Add New SSH Key</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter the details for your new SSH key.</DialogContentText>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField name="title" label="Title" margin="normal" required />

                        <RHFTextField
                            name="key"
                            label="SSH Key"
                            margin="normal"
                            rows={4}
                            required
                            multiline
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            placeholder={`Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'`}
                        />

                        <DialogActions>
                            <Button onClick={() => setOpenAddDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                                Add
                            </Button>
                        </DialogActions>
                    </FormProvider>
                </DialogContent>
            </Dialog>

            <Button variant="outlined" onClick={() => setOpenAddDialog(true)}>
                New SSH Key
            </Button>
        </>
    );
}
