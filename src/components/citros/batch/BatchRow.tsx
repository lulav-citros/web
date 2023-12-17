import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    LinearProgress,
    Link,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
import { BatchRun } from 'src/@types/repo';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_BATCH, PATH_REPO } from 'src/routes/paths';
import BatchStatus from 'src/sections/batch/chips/BatchStatus';
import { fDateTimeShort, fToNow } from 'src/utils/formatTime';
import { addExtensionToSimulation } from '../utils';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useSnackbar } from 'src/components/snackbar';

type Props = {
    batchRun: BatchRun;
};

export function BatchRow({ batchRun }: Props) {
    const { copy } = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    const { route, push } = useRouter();

    let progress = (100 * batchRun.simulationRunsCountDone.totalCount) / batchRun.simulationRunsCount.totalCount;
    let statusProg = batchRun.simulationRunsCountDone.totalCount + '/' + batchRun.simulationRunsCount.totalCount;

    const onCopy = (text: string) => {
        if (text) {
            enqueueSnackbar(text + ' copied!');
            copy(text);
        }
    };

    return (
        <Box
            key={batchRun.id}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                ':hover': {
                    // cursor: 'pointer',
                    backgroundColor: 'grey.850',
                },
            }}
            // onClick={() => {
            //     push(PATH_BATCH.view(batchRun.id));
            // }}
        >
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link href={PATH_REPO.view(batchRun.repo.name, batchRun.citrosBranch)} sx={{ mr: 1 }}>
                        {batchRun.repo.name}{':('+batchRun.citrosBranch+')'}
                    </Link>
                    /
                    <Link
                        href={PATH_REPO.blob(
                            batchRun.repo.name,
                            batchRun.citrosBranch,
                            `simulations/${addExtensionToSimulation(batchRun.simulation)}`
                        )}
                        sx={{ ml: 1, mr: 1 }}
                    >
                        {batchRun.simulation}
                    </Link>
                    /
                    <Link href={PATH_REPO.batch.view(batchRun.repo.name, batchRun.id)} sx={{ ml: 1 }}>
                        {/* <Chip sx={{ ml: 1 }} color="success" size="small" variant="outlined" label={batchRun.name}></Chip> */}
                        {batchRun.name}
                    </Link>
                </Typography>

                {/* <Iconify icon="clarity:copy-to-clipboard-line" width={16} /> */}

                <>
                    <Typography variant="body2" color="grey.600" sx={{ pt: 0.5 }}>
                        {batchRun.id}
                        <IconButton onClick={() => onCopy(batchRun.id as string)}>
                            <Iconify icon="eva:copy-fill" width={16} />
                        </IconButton>
                    </Typography>
                </>

                <Box flex={10}></Box>

                {/* <Typography variant="body2" color="grey.600">
                    {batchRun.id}
                </Typography> */}
                {/* <Box sx={{ flexGrow: 1 }}>
                    <BatchStatus progress={batchRun.progress as string}></BatchStatus>
                </Box> */}
                <Tooltip title={batchRun.createdAt} sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ alignContent: 'right' }}>
                        {fDateTimeShort(batchRun.createdAt)}
                    </Typography>
                </Tooltip>
            </Box>

            <Typography variant="caption" sx={{ pl: 5 }}>
                {batchRun.message}
            </Typography>

            {/* <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <LinearProgress
                    value={progress}
                    variant="determinate"
                    color={(progress < 30 && 'error') || (progress > 30 && progress < 70 && 'warning') || 'primary'}
                    sx={{ width: 1, height: 6 }}
                />                
                <Typography variant="caption">{statusProg}</Typography>
            </Stack> */}

            {/* <Stack direction="row" spacing={1} sx={{ paddingTop: 1 }}> */}
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                gap={1}
                sx={{
                    pt: 1,
                }}
            >
                <Box
                    display={'flex'}
                    // justifyContent={'space-between'}
                    gap={1}
                    sx={{
                        pt: 1,
                    }}
                >
                    <Chip
                        sx={{ ml: 1 }}
                        // color="warning"
                        size="small"
                        variant="outlined"
                        label={
                            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                                <Box sx={{ pt: '2px' }}>
                                    <CircularProgress
                                        color="info"
                                        variant="determinate"
                                        value={progress}
                                        size={14}
                                        thickness={6}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {batchRun.simulationRunsCountDone.totalCount} of{' '}
                                    {batchRun.simulationRunsCount.totalCount} runs
                                </Typography>
                            </Stack>
                        }
                    ></Chip>

                    <Stack direction="row" spacing={1}>
                        <Iconify icon="mdi:user-outline" />
                        <Typography variant="body2" color="text.secondary">
                            {batchRun.user && batchRun.user.email}
                        </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                        {batchRun.image}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Iconify icon="la:git" />
                        <Tooltip
                            children={
                                <Typography variant="body2" color="text.secondary">
                                    {batchRun.userCommit && batchRun.userCommit.slice(0, 12)}
                                </Typography>
                            }
                            title={'The commit the data was created with.'}
                        ></Tooltip>

                        <Iconify icon={'mdi:tag-outline'} />
                        <Tooltip
                            children={
                                <Typography variant="body2" color="text.secondary">
                                    {batchRun.tag && batchRun.tag.slice(0, 12)}
                                </Typography>
                            }
                            title={'Simulation image tag.'}
                        ></Tooltip>
                    </Stack>
                </Box>

                <Box
                    display={'flex'}
                    // justifyContent={'space-between'}
                    gap={1}
                    sx={{
                        pt: 1,
                    }}
                >
                    <Iconify icon="gala:data" sx={{ color: 'gray' }} />
                    <Typography minWidth={100} variant="body2">
                        {fToNow(batchRun.dataLastAccess)}
                    </Typography>

                    <Chip
                        size="small"
                        variant="outlined"
                        color={batchRun.dataStatus == 'LOADED' ? 'success' : 'warning'}
                        label={batchRun.dataStatus}
                    ></Chip>
                </Box>
            </Box>
            {/* </Stack> */}
        </Box>
    );
}
