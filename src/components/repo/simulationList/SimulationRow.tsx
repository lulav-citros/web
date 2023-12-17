import { Box, Button, Chip, IconButton, LinearProgress, Link, Stack, Tooltip, Typography } from '@mui/material';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
import { SimulationRun } from 'src/@types/repo';
import FoxgloveIcon from 'src/assets/icons/foxgloveIcon';
import { FoxgloveView } from 'src/components/citros/foxglove/view';
import { downloadFileFromBucket, foxgloveFileFromBucket } from 'src/components/data-browser/utils';
import Iconify from 'src/components/iconify';
import { PATH_BATCH, PATH_REPO } from 'src/routes/paths';
import BatchStatus from 'src/sections/batch/chips/BatchStatus';
import { fDateTimeShort } from 'src/utils/formatTime';

type Props = {
    simulationRun: SimulationRun;
    simulation?: string;
    batch_name?: string;
    batchRunId: string;
    repoName: string;
};
export function SimulationRow({ simulationRun, simulation, batch_name, batchRunId, repoName }: Props) {
    const { route, push } = useRouter();

    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                // ':hover': {
                //     cursor: 'pointer',
                //     backgroundColor: 'grey.850',
                // },
            }}
            // onClick={() => {
            //     // push(PATH_BATCH.simulation.run(batchRunId, simulationRun.id));
            //     push(PATH_REPO.batch.run(repoName, batchRunId, simulationRun.id));
            // }}
        >
            <Stack
                direction={'row'}
                spacing={1}
                flex={3}
                sx={{
                    ':hover': {
                        cursor: 'pointer',
                        // backgroundColor: 'grey.850',
                    },
                }}
                onClick={() => {
                    // push(PATH_BATCH.simulation.run(batchRunId, simulationRun.id));
                    push(PATH_REPO.batch.run(repoName, batchRunId, simulationRun.id));
                }}
            >
                <Typography sx={{ maxWidth: '20px', pr: 2 }} variant="body2" color="text.secondary">
                    {simulationRun.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {simulationRun.message}
                </Typography>
            </Stack>
            {/* <Typography variant="body2" color="text.secondary">
                {simulationRun.status}
            </Typography> */}
            <Box flex={1}>
                <BatchStatus status={simulationRun.status as string}></BatchStatus>
            </Box>

            <Box flex={1}>
                <FoxgloveView
                    status={simulationRun.status}
                    batchRunId={batchRunId}
                    sid={simulationRun.id}
                    repoName={repoName}
                    simulation={simulation!}
                    batch_name={batch_name!}
                ></FoxgloveView>
            </Box>

            <Typography variant="body2" color="text.secondary" flex={1}>
                {fDateTimeShort(simulationRun.createdAt)}
            </Typography>
        </Box>
    );
}
