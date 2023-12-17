import { FC, useEffect } from 'react';
import { useJupyterEditorContext } from './context/JupyterEditorContext';
import { useKernelManager } from '../kernel';
import { useSnackbar } from 'notistack';

export const JupyterEditorError: FC = () => {
    const {
        state: { error },
    } = useJupyterEditorContext();
    const { error: kernelError } = useKernelManager();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!error && !kernelError) return;

        enqueueSnackbar(error || kernelError, { variant: 'error' });
    }, [enqueueSnackbar, error, kernelError]);

    return null;
};
