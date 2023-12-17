import { Box, Grid, InputAdornment, LinearProgress, Link, TextField, Tooltip, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import NewSimulationFormDialogs from 'src/sections/batch/dialog/NewSimulationFormDialogs';
import { BatchRun } from 'src/@types/repo';
import { PATH_REPO } from 'src/routes/paths';
import { Simulation } from 'src/@types/test';
import { useQuery } from '@apollo/client';
import { GET_SIMULATION_METRICS } from 'src/graphQL/observability';
import { useMemo } from 'react';

type Props = {
    batch_run_id: string;
    sid: string;
};

export function SimulationMetrics({ batch_run_id, sid }: Props) {
    // add subscriptions https://www.apollographql.com/docs/react/data/fragments
    const { loading, error, data, startPolling } = useQuery(GET_SIMULATION_METRICS, {
        variables: {
            batchRunId: batch_run_id,
            sid: parseInt(sid as string),
            // from: new Date(new Date().getSeconds() - 10).toJSON()
        },
    });
    if (error) {
        console.log('ERROR!', error);
    }
    startPolling(10000);

    const progressData = useMemo(() => {
        if (data == undefined || data.getSimulationMetricsList.length == 0 || error) {
            return {
                cpu: undefined,
                mem: undefined,
                gpu: undefined,
            };
        }

        const maxCPU = parseFloat(data.batchRun.cpu);
        const maxGPU = parseFloat(data.batchRun.gpu);
        const maxMEM = parseInt(data.batchRun.memory);

        // console.log("maxCPU", maxCPU,"maxGPU", maxGPU,"maxMEM", maxMEM,   "data", data);

        const cpu = (parseFloat(data.getSimulationMetricsList[0]['cpuUtilization']) / maxCPU) * 100.0;
        const mem = (parseInt(data.getSimulationMetricsList[0]['memoryRss']) / 1024 / 1024 / maxMEM) * 100.0;

        let resp = {
            cpu: cpu,
            mem: mem,
            gpu: 0,
        };
        return resp;
    }, [data]);

    return (
        <>
            {!loading && (
                <Grid container spacing={1}>
                    {progressData.cpu != undefined && (
                        <Box
                            sx={{
                                width: 55,
                                height: 80,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    width: 2,
                                    color: 'fff',
                                    marginRight: '0px',
                                    writingMode: 'vertical-lr',
                                    textOrientation: 'upright',
                                }}
                            >
                                CPU
                            </Typography>

                            <Tooltip title={progressData.cpu} arrow>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressData.cpu as unknown as number}
                                    sx={{ width: 1, height: 7, transform: 'rotate(270deg)' }}
                                />
                            </Tooltip>
                        </Box>
                    )}

                    {progressData.gpu != undefined && (
                        <Box
                            sx={{
                                width: 55,
                                height: 80,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    width: 2,
                                    color: 'fff',
                                    marginRight: '0px',
                                    writingMode: 'vertical-lr',
                                    textOrientation: 'upright',
                                }}
                            >
                                GPU
                            </Typography>

                            <Tooltip title={progressData.gpu} arrow>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressData.gpu}
                                    sx={{ width: 1, height: 7, transform: 'rotate(270deg)' }}
                                />
                            </Tooltip>
                        </Box>
                    )}

                    {progressData.mem != undefined && (
                        <Box
                            sx={{
                                width: 55,
                                height: 80,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    width: 2,
                                    color: 'fff',
                                    marginRight: '0px',
                                    writingMode: 'vertical-lr',
                                    textOrientation: 'upright',
                                }}
                            >
                                MEM
                            </Typography>

                            <Tooltip title={progressData.mem} arrow>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressData.mem as unknown as number}
                                    sx={{ width: 1, height: 7, transform: 'rotate(270deg)' }}
                                />
                            </Tooltip>
                        </Box>
                    )}

                    {/* <Grid item sx={{ width: '5%' }} xs={1} sm={1} md={1}>
            <AnalyticsProgressBar data={progressData.cpu} label="CPU" updateInterval={10000} />
        </Grid> */}
                    {/* <Grid item sx={{ width: '5%' }} xs={1} sm={1} md={1}>
            <AnalyticsProgressBar data={progressData.ram} label="RAM" />
        </Grid> */}
                </Grid>
            )}
        </>
    );
}
