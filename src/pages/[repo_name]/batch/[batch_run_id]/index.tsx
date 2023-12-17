import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Tab, Tabs, Container, Typography, Divider, Stack } from '@mui/material';
import { RepoLayout } from '../../../../layouts/repo';
import { useQuery } from '@apollo/client';
import { GET_SIMULATION_RUNS } from 'src/graphQL/repos';
import { SimulationListToolbar } from 'src/components/repo/simulationList/SimulationListToolbar';
import { SimulationRow } from 'src/components/repo/simulationList/SimulationRow';
import { BatchRun, SimulationRun } from 'src/@types/repo';
import { BatchRunSideBar } from 'src/components/repo/simulationList/BatchRunSideBar';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import { SimulationHeader } from 'src/components/repo/simulationList/SimulationHeader';

function createTitle(title: string): string {
    return 'Batch Run: ' + title;
}

// ----------------------------------------------------------------------

TestRun.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page} </RepoLayout>;
};

function filterData(list: SimulationRun[], filter: string): SimulationRun[] {
    if (!filter) {
        return list;
    }
    return list.filter((row) => row.id == filter);
}

export default function TestRun() {
    const { query } = useRouter();

    const { batch_run_id } = query;

    const [filter, setFileter] = useState('');

    const { loading, error, data, refetch } = useQuery(GET_SIMULATION_RUNS, {
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

        // console.log("simulation-runs:", loading, error, data );
        if (!error && !loading) {
            // console.log("batchRun", data.batchRunsList[0])
            return data.batchRunsList[0];
        }
    }, [data]);

    if (loading) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }

    return (
        <>
            <Head>
                <title>Simulation Runs</title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <SimulationListToolbar
                    batchRun={batchRun}
                    onChange={(data) => setFileter(data as string)}
                    refetch={refetch}
                />

                <Divider />

                <Stack direction="row" spacing={3} mt={5}>
                    <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1, width: '100%' }}>
                        <SimulationHeader></SimulationHeader>
                        {batchRun &&
                            batchRun.simulationRunsList &&
                            filterData(batchRun.simulationRunsList, filter).map((simRun) => (
                                <SimulationRow
                                    repoName={batchRun.repo.name}
                                    batchRunId={batchRun.id}                                    
                                    simulationRun={simRun}
                                    key={simRun.id}

                                    simulation={batchRun.simulation}
                                    batch_name={batchRun.name}
                                />
                            ))}
                    </Box>

                    <BatchRunSideBar batchRun={batchRun}></BatchRunSideBar>
                </Stack>
            </Container>
        </>
    );
}
