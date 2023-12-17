import { Box, InputAdornment, Link, TextField, Typography } from '@mui/material';
import NewRepoDialog from '../../citros/dialogs/NewRepoDialogs';
import Iconify from 'src/components/iconify';
import NewSimulationFormDialogs from 'src/sections/batch/dialog/NewSimulationFormDialogs';
import { BatchRun } from 'src/@types/repo';
import { PATH_REPO } from 'src/routes/paths';
import { addExtensionToSimulation } from 'src/components/citros/utils';

type Props = {
    onChange: (data: string | undefined) => void;
    refetch: () => void;
    batchRun: BatchRun;
};

export function SimulationListToolbar({ onChange, refetch, batchRun }: Props) {
    // console.log("batchRun", batchRun);

    return (
        <Box>
            {/* <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>

                {batchRun.id}
                {batchRun.name}
                {batchRun.message}

                {batchRun.status}
                {batchRun.storageType}

                {batchRun.cpu}
                {batchRun.memory}
                {batchRun.gpu}

                {batchRun.createdAt}

                {batchRun.image}
            </Box> */}

            <Box>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Batch run: {batchRun.name}
                </Typography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link href={PATH_REPO.view(batchRun.repo.name)} sx={{ mr: 1 }}>
                        {batchRun.repo.name}
                    </Link>
                    /
                    <Link
                        href={PATH_REPO.blob(
                            batchRun.repo.name,
                            batchRun.citrosBranch,
                            `simulations/${addExtensionToSimulation(batchRun.simulation)}`
                        )}
                        sx={{ m: 1 }}
                    >
                        {batchRun.simulation}
                    </Link>
                </Typography>

                <Typography variant="body2" color="grey.600">
                    {batchRun.id}
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ flexGrow: 1, pb: 1 }}>
                message: {batchRun.message}
            </Typography>

            <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
                <TextField
                    id='find-simulation'
                    type='text'
                    placeholder={'Find a batch run...'}
                    size={'small'}
                    fullWidth
                    sx={{ flex: 1, pr: 1 }}
                    onChange={(event) => onChange(event.target.value)}
                    // inputProps={{ style: { height: '16px' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="majesticons:search-line" width={24} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
}
