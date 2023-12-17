import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Divider, Button, Grid, Tooltip, LinearProgress } from '@mui/material';
import { RepoLayout } from '../../../../layouts/repo';
import { SimulationRunLogs, SimulationRunEvents } from '../../../../sections/batch';
import { Stack } from '@mui/system';
import { useQuery } from '@apollo/client';
import { SimulationListToolbar } from 'src/sections/batch/SimulationToolbar';
import { SimulationMetrics } from 'src/sections/batch/SimulationMetrics';
import { BatchRun } from 'src/@types/repo';
import { GET_BATCH_RUN } from 'src/graphQL/repos';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { FoxgloveView } from 'src/components/citros/foxglove/view';
import { If, Then } from 'react-if';

function createTitle(title: string): string {
    return 'Simulation Run';
}

SimulationRunPage.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page} </RepoLayout>;
};

type ProgressData = {
    cpu: number[];
    ram: number[];
};

export default function SimulationRunPage() {
    const { query } = useRouter();

    const { batch_run_id, sid } = query;

    const { loading, error, data } = useQuery(GET_BATCH_RUN, {
        variables: { batchRunId: batch_run_id },
    });
    if (error) {
        console.log('ERROR!', error);
    }
    // transform data to projects type
    const batchRun: BatchRun = useMemo(() => {
        if (data == undefined) {
            return [];
        }
        // console.log('simulation-runs:', loading, error, data);
        if (!error && !loading) {
            // console.log('[sid] -> batchRun', data.batchRunsList[0]);
            return data.batchRunsList[0];
        }
    }, [data]);

    if (loading) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }

    return (
        <>
            <Head>
                <title>Simulation Run</title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <SimulationListToolbar batchRun={batchRun} sid={sid as string} />
                <Divider />
            </Container>
            <Container maxWidth={false}>
                <Stack direction="row" spacing={3} mt={5}>
                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'scroll',
                            border: 0.5,
                            borderColor: 'grey.700',
                            borderRadius: 1,
                        }}
                    >
                        <SimulationRunLogs batchRunId={batch_run_id as string} simulationRunId={sid as string} />
                    </Box>

                    <Stack spacing={1} mt={5} sx={{ minWidth: '250px' }}>
                        <Typography variant="h6">Actions</Typography>
                        <FoxgloveView
                            status={batchRun.status}
                            batchRunId={batchRun.id}
                            sid={sid as string}
                            repoName={batchRun.repo.name}
                            simulation={batchRun.simulation}
                            batch_name={batchRun.name}
                        ></FoxgloveView>

                        <If condition={batchRun.status == 'RUNNING'}>
                            <Then>
                                <Typography variant="h6">Metrics</Typography>
                                <SimulationMetrics
                                    batch_run_id={batch_run_id as string}
                                    sid={sid as string}
                                ></SimulationMetrics>
                            </Then>
                        </If>

                        <Typography variant="h6">Events</Typography>
                        <SimulationRunEvents batchRunId={batch_run_id as string} simulationRunId={sid as string} />
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
