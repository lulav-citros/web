import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFCodes } from '../../components/hook-form';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// listening to email
import { useMemo, useEffect } from 'react';
// ----------------------------------------------------------------------

interface FormValuesProps {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
    _email: string;
}

type Props = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
    _email?: string;
    onSubmitted: VoidFunction;
};

export default function AuthVerifyCodeForm({ _email, onSubmitted }: Props) {
    const { verify } = useAuthContext();
    const { query } = useRouter();
    const { email } = query;

    useMemo;
    // const _email = useMemo(() => [email], [email])

    const { enqueueSnackbar } = useSnackbar();

    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required('Code is required'),
        code2: Yup.string().required('Code is required'),
        code3: Yup.string().required('Code is required'),
        code4: Yup.string().required('Code is required'),
        code5: Yup.string().required('Code is required'),
        code6: Yup.string().required('Code is required'),
        email: Yup.string(),
    });

    const defaultValues = useMemo(
        () => ({
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
            _email: email as unknown as string,
        }),
        [email]
    );

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        if (email) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            let code = data.code1 + data.code2 + data.code3 + data.code4 + data.code5 + data.code6;
            console.log('Data:\n', data);
            //   if (verify) {
            //     await verify(data._email, code);
            //   }

            enqueueSnackbar('Verify success!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

                {(!!errors.code1 ||
                    !!errors.code2 ||
                    !!errors.code3 ||
                    !!errors.code4 ||
                    !!errors.code5 ||
                    !!errors.code6) && (
                    <FormHelperText error sx={{ px: 2 }}>
                        Code is required
                    </FormHelperText>
                )}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ mt: 3 }}
                >
                    Verify
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
