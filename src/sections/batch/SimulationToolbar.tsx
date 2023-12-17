import { Box, InputAdornment, Link, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { BatchRun } from 'src/@types/repo';
import { PATH_BATCH, PATH_REPO } from 'src/routes/paths';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { addExtensionToSimulation } from 'src/components/citros/utils';

type Props = {
    batchRun: BatchRun;
    sid: string;
};

export function SimulationListToolbar({ batchRun, sid }: Props) {
    if (!batchRun) {
        return <LoaderOverWidget />;
    }
    // console.log('toolbar: batchRun', batchRun);

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

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Simulation run: {batchRun.name} / {sid}
                </Typography>

                <Typography variant="body2" color="grey.600">
                    Access  
                    <Link href={PATH_REPO.batch.simData(batchRun.repo.name, batchRun.simulation, batchRun.name, sid)}> recorded data</Link>
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
                    /
                    <Link href={PATH_REPO.batch.view(batchRun.repo.name, batchRun.id)} sx={{ m: 1 }}>
                        {batchRun.name}
                    </Link>
                    / {sid}
                </Typography>

                <Typography variant="body2" color="grey.600">
                    {batchRun.id}
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ flexGrow: 1, pb: 1 }}>
                message: {batchRun.message}
            </Typography>

            {/* <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>

                <TextField
                    placeholder={'Find a batch run...'}

                    size={'small'}
                    fullWidth

                    sx={{ flex: 1, pr: 1 }}
                    onChange={(event) => onChange(event.target.value)}
                    // inputProps={{ style: { height: '16px' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <Iconify icon="majesticons:search-line" width={24} />
                            </InputAdornment>
                        ),
                    }}
                />

            </Box> */}
        </Box>
    );
}
