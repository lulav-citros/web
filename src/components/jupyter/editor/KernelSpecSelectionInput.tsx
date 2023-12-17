import { useKernelManager } from '../kernel';
import { MenuItem, Select } from '@mui/material';
import { KernelSpec } from '@jupyterlab/services';

export function KernelSpecSelectionInput() {
    const { kernelsSpec, setDefaultKernelSpec } = useKernelManager();

    const kernelsSpecs = Object.values(kernelsSpec?.kernelspecs || {}) as KernelSpec.ISpecModel[];
    const selected = kernelsSpec?.default;

    return (
        <Select key={kernelsSpec?.default} value={selected} size={'small'} sx={{ width: 140 }}>
            {kernelsSpecs?.map((kernelSpec) => (
                <MenuItem
                    key={kernelSpec.name}
                    selected={selected === kernelSpec.name}
                    value={kernelSpec.name}
                    onClick={() => selected !== kernelSpec.name && setDefaultKernelSpec(kernelSpec.name)}
                >
                    {getKernelDisplayName(kernelSpec)}
                </MenuItem>
            ))}
        </Select>
    );
}

function getKernelDisplayName(kernelSpec: KernelSpec.ISpecModel): string {
    // @ts-ignore
    return kernelSpec?.['spec']?.['display_name'] || kernelSpec.display_name || kernelSpec.name;
}
