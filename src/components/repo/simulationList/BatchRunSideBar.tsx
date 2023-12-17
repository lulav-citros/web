import { Box, Chip, CircularProgress, Divider, LinearProgress, Link, Stack, Tooltip, Typography } from '@mui/material';
import { paramCase } from 'change-case';
import { BatchRun } from 'src/@types/repo';
import Iconify from 'src/components/iconify/Iconify';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { PATH_BATCH, PATH_REPO } from 'src/routes/paths';
import BatchStatus from 'src/sections/batch/chips/BatchStatus';
import { fDateTimeShort, fToNow } from 'src/utils/formatTime';

type Props = {
    batchRun: BatchRun;
};
export function BatchRunSideBar({ batchRun }: Props) {
    // id: string,
    // message: string,
    // progress: string,
    // metadata: string,
    // createdAt: string,
    // updatedAt: string,

    // console.log("BatchRunSideBar batchRun", batchRun)

    if (!batchRun) {
        return <LoaderOverWidget />;
    }
    let progress = (100 * batchRun.simulationRunsCountDone.totalCount) / batchRun.simulationRunsCount.totalCount;
    let statusProg = batchRun.simulationRunsCountDone.totalCount + '/' + batchRun.simulationRunsCount.totalCount;

    return (
        <Box key={batchRun.id} sx={{ maxWidth: '250px', width: '250px', height: '60vh' }}>            
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {batchRun.name}
            </Typography>
            {/* <Typography variant="body2" color="grey.600">{batchRun.id}</Typography> */}
            <Typography variant="caption" color="text.secondary">
                {batchRun.message}
            </Typography>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Typography variant="body2" color="text.secondary">
                    Status:
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <BatchStatus status={batchRun.status as string}></BatchStatus>
                </Box>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Typography variant="body2" color="text.secondary">
                    Created:
                </Typography>
                <Tooltip title={fDateTimeShort(batchRun.createdAt)} sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">{fToNow(batchRun.createdAt)}</Typography>
                </Tooltip>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Typography variant="body2" color="text.secondary">
                    Progress:
                </Typography>
                {/* <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '100%' }}> */}
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
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon={'mdi:user-outline'} sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    By:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {batchRun.user && batchRun.user.email}
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon={'ph:git-branch-duotone'} sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    branch:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {batchRun.userBranch}
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon={'majesticons:git-commit-line'} sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    User:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {batchRun.userCommit.slice(0, 12)}
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon={'majesticons:git-commit-line'} sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    CITROS:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {batchRun.citrosCommit.slice(0, 12)}
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon={'teenyicons:docker-outline'} sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    Image:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Link href={PATH_REPO.image(batchRun.repo.name, batchRun.tag)}>
                        {batchRun.image || batchRun.repo.name}:{batchRun.tag && batchRun.tag.slice(0, 12)}
                    </Link>
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Iconify icon="gala:data" sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    Data:
                </Typography>
                <Chip
                    size="small"
                    variant="outlined"
                    color={batchRun.dataStatus == 'LOADED' ? 'success' : 'warning'}
                    label={batchRun.dataStatus}
                ></Chip>
            </Stack>
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>
                <Box sx={{ pt: '2px' }}></Box>
                <Typography sx={{ pt: '3px' }} variant="caption" color="text.secondary">
                    {fToNow(batchRun.dataLastAccess)}
                </Typography>
            </Stack>
            <Divider sx={{ m: 1 }}></Divider>
            {/* ********************************************** */}
            <Stack direction={'row'} spacing={0.5} sx={{ pt: '3px' }}>            
                <Iconify icon="tdesign:data" sx={{ width: 16, color: 'gray' }} />
                <Typography variant="body2" color="text.secondary">
                    Access
                </Typography>
                <Typography minWidth={100} variant="body2">
                    <Link href={PATH_REPO.batch.data(batchRun.repo.name, batchRun.simulation, batchRun.name)}>
                        recorded data
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
}
