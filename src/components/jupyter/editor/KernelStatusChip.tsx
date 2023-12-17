import { Kernel } from '@jupyterlab/services';
import { Chip, ChipProps } from '@mui/material';
import { useKernelManager } from '../kernel';

const kernelStatusChip: Record<Kernel.Status, Pick<ChipProps, 'color' | 'label'>> = {
    unknown: { label: 'unknown', color: 'default' },
    starting: { label: 'starting', color: 'warning' },
    idle: { label: 'idle', color: 'success' },
    busy: { label: 'busy', color: 'error' },
    restarting: { label: 'restarting', color: 'warning' },
    autorestarting: { label: 'autorestarting', color: 'warning' },
    terminating: { label: 'terminating', color: 'default' },
    dead: { label: 'dead', color: 'default' },
};

export function KernelStatusChip() {
    const { loading, status, kernel } = useKernelManager();

    // console.log("kernel", kernel)
    if (kernel == undefined || loading.kernel || !status || status === 'unknown') {
        return null;
    }

    return <Chip size={'small'} {...kernelStatusChip[status]} />;
}
