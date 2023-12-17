import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
// form

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Paper,
    Tooltip,
    Box,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFTextField,
    RHFRadioGroup,
} from '../../../components/hook-form';
import { Card, Grid, Stack, Typography, InputAdornment, MenuItem, Divider } from '@mui/material';

import { gql, useQuery } from '@apollo/client';
import getAppoloClinet from '../../../utils/connectAppolo';
import ReposDropDown from '../dropdown/ReposDropDown';
import SimulationsDropDown from '../dropdown/SimulationsDropDown';
import { useAuthContext } from 'src/auth/useAuthContext';

import SimulationDialog from './SimulationView';
import { BatchRun, Repo } from 'src/@types/repo';
import SimulationView from './SimulationView';
import { Simulation } from 'src/@types/test';
import BranchDown from '../dropdown/BranchDown';
import { DEFAULT_BRANCH } from 'src/config';
import axios from 'src/utils/axios';
// ----------------------------------------------------------------------

type Props = {
    repoName?: string;
    branch?: string;
    simulationName?: string;

    onSubmit: VoidFunction;
    onClose: VoidFunction;
};

interface BatchRunForm {
    repo?: Repo;
    branch: string;
    simulation?: string;
    simulationData?: Simulation;
    batchRun: {
        repoId: string; //ok
        simulation: string; //ok

        citrosCommit: string; // from gitolite?!
        citrosBranch: string; // ok
        userCommit: string; // ok
        userBranch: string; // ok

        gpu: string; //ok
        cpu: string; //ok
        memory: number; //ok
        timeout: number; //ok
        name: string; //ok
        message: string; //ok
        storageType: string; //ok
        image: string | null;
        tag: string | null;
        completions: number; //ok
        parallelism: number; //ok
    };
}

export default function NewSimulationDialogsContent({ repoName, branch, simulationName, onSubmit, onClose }: Props) {
    // console.log("NewSimulationFormDialogs repoId: ", repoId, ", simulation:", simulation);

    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuthContext();

    const [state, setState] = useState<BatchRunForm>({
        repo: undefined,
        branch: DEFAULT_BRANCH,
        simulation: undefined,
        simulationData: undefined,
        batchRun: {
            repoId: '',
            simulation: '',
            gpu: '',
            cpu: '',
            memory: 256,
            timeout: 60,
            userCommit: '',
            userBranch: DEFAULT_BRANCH,
            name: '',
            message: '',
            completions: 1,
            parallelism: 1,
            citrosCommit: '',
            citrosBranch: DEFAULT_BRANCH,
            storageType: '',
            image: null,
            tag: null,
        },
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const submitable = useMemo(() => {
        if (state.batchRun.repoId == '') {
            setErrorMessage('Please choose repo first');
            return false;
        }

        if (state.batchRun.simulation == '') {
            setErrorMessage('Please choose simulaiton first');
            return false;
        }

        if (state.batchRun.name == '') {
            setErrorMessage('Name cant be empty!');
            return false;
        }

        if (state.batchRun.message == '') {
            setErrorMessage('Mssage cant be empty!');
            return false;
        }
        setErrorMessage('');
        return true;
    }, [state]);

    useEffect(() => {
        // Fetch data (unchanged)
        const fetchData = async () => {
            // console.log("vova - sim", sim)

            const axiosResponse = await axios.get(
                `/git/api/${user.organization.slug}/${state.repo?.name}/blob/${state.branch}/simulations/${state.simulation}`
            );

            // return axiosResponse;
            const parsedData = JSON.parse(axiosResponse?.data);

            if (parsedData == null) {
                return;
            }

            // console.log("parsedData", parsedData, parsedData.GPU);
            setState((prevstate) => ({
                ...prevstate,
                simulationData: parsedData,
                batchRun: {
                    ...prevstate.batchRun,
                    cpu: parsedData.CPU,
                    gpu: parsedData.GPU,
                    memory: parsedData.MEM,
                    storageType: parsedData.storage_type,
                    timeout: parsedData.timeout,
                },
            }));
        };

        const fetchUserCommit = async () => {
            const axiosResponse = await axios.get(
                `/git/api/${user.organization.slug}/${state.repo?.name}/blob/${state.branch}/user_commit`
            );

            // return axiosResponse;
            const parsedData = axiosResponse?.data;
            // console.log('fetchUserCommit', parsedData);

            if (parsedData == null) {
                return;
            }

            // console.log("parsedData", parsedData, parsedData.GPU);
            setState((prevstate) => ({
                ...prevstate,
                batchRun: {
                    ...prevstate.batchRun,
                    userCommit: parsedData,
                },
            }));
        };

        const fetchUserImage = async () => {            
            // set the last tag to the batch_run.tag field
            const axiosResponse = await axios.get(`/api/artifactory/${state.repo?.name}/branch.${state.branch}`);

            // // return axiosResponse;
            const parsedData = axiosResponse?.data;

            if (parsedData.length == 0) {                
                enqueueSnackbar(`There are no tags available for this artifact and branch! ${state.repo?.name}/${state.branch}`, { variant: 'error' });
                console.error('There are no tags available for this artifact!');
                return;
            }
            let tags = parsedData.relatedTags.map((tag: any) => {
                return tag.name.split('/').pop();
            });

            tags = tags.filter((tag: string) => {
                return tag != 'latest' && tag.includes('branch.') == false;
            });

            if (tags.length == 0) {                
                enqueueSnackbar('There are no tag available which is not "latest"!', { variant: 'error' });
                console.error('There are no tag available which is not "latest"!');
                return;
            }
            const tag = tags[0];

            // console.log('fetchUserCommit', tag);

            // console.log("parsedData", parsedData, parsedData.GPU);
            setState((prevstate) => ({
                ...prevstate,
                batchRun: {
                    ...prevstate.batchRun,
                    tag: tag,
                },
            }));

            console.log(state);
        };

        const fetchCitrosCommit = async () => {
            const axiosResponse = await axios.get(
                `/git/api/${user.organization.slug}/${state.repo?.name}/${state.branch}/commit`
            );

            // return axiosResponse;
            const parsedData = axiosResponse?.data;
            // console.log('fetchCitrosCommit', parsedData);

            if (parsedData == null) {
                return;
            }

            // console.log("parsedData", parsedData, parsedData.GPU);
            setState((prevstate) => ({
                ...prevstate,
                batchRun: {
                    ...prevstate.batchRun,
                    citrosCommit: parsedData.hexsha,
                },
            }));
        };

        if (state.simulation !== '' && state.simulation !== undefined) {
            fetchData();
            fetchUserCommit();
            fetchCitrosCommit();
            fetchUserImage();
            // console.log("simulationList", simulationList);
        }
    }, [state.simulation, state.repo, state.branch]);

    const handleSubmit = async () => {
        // console.log(repo, sim, simdata, completions, parallelism, title, message);

        try {
            console.log('batchRun  ', state.batchRun);
            // return;
            // console.log("typeof(completions)", typeof(completions));

            if (errorMessage != '') {
                console.log('batchRun  ', state.batchRun);
                enqueueSnackbar(errorMessage, { variant: 'error' });
                return;
            }

            // update
            const client = getAppoloClinet();
            let resp = await client.mutate({
                variables: {
                    batch_run: {
                        batchRun: state.batchRun,
                    },
                },
                mutation: gql`
                    mutation createBatchRun($batch_run: CreateBatchRunInput!) {
                        createBatchRun(input: $batch_run) {
                            batchRun {
                                id
                            }
                        }
                    }
                `,
            });

            const dataFromClient = await resp;

            // console.log("dataFromClient", dataFromClient);

            // setIsDirty(false);

            // reset();
            enqueueSnackbar('Update success!');
            //   reload();
            //   push(PATH_DASHBOARD.integration.simulation.view(projectName as string, simulationId as string));
            onSubmit();
            onClose();
            // push(PATH_DASHBOARD.test.list);
            // onSubmitted(dataFromClient.data.upsertSimulation.simulation);
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <>
            <DialogTitle>Run Simulation</DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    <DialogContentText>
                        choose simulation from projects. choose how many repitations and how many simualtions will run
                        in parallel.
                    </DialogContentText>

                    <ReposDropDown
                        defaultRepoName={repoName}
                        onChange={(repo) => {
                            console.log('ReposDropDown onChange repo:', repo);
                            setState((prevstate) => ({
                                ...prevstate,
                                repo: repo,
                                batchRun: {
                                    ...prevstate.batchRun,
                                    repoId: repo.id,
                                },
                            }));
                        }}
                    />

                    {state.repo && (
                        <BranchDown
                            repoName={state.repo?.name}
                            branch={state.branch}
                            onChange={(br) => {
                                // console.log('ReposDropDown BranchDown brranch:', br);
                                setState((prevstate) => ({
                                    ...prevstate,
                                    branch: br,
                                    batchRun: {
                                        ...prevstate.batchRun,
                                        citrosBranch: br,
                                        userBranch: br,
                                    },
                                }));

                                // console.log("state.branch", state.branch, br)
                            }}
                        />
                    )}

                    {state.repo && state.branch && (
                        <SimulationsDropDown
                            repoName={state.repo.name}
                            branch={state.branch}
                            onChange={(simulation) => {
                                // console.log('ReposDropDown SimulationsDropDown simulation:', simulation);

                                let simulationName = simulation;
                                if (simulation.endsWith('.json')) {
                                    simulationName = simulation.split('.')[0];
                                }
                                setState((prevstate) => ({
                                    ...prevstate,
                                    simulation: simulation,
                                    batchRun: {
                                        ...prevstate.batchRun,
                                        simulation: simulationName, // for the batch saves only the name of the simulation withput the extension.
                                    },
                                }));
                            }}
                        />
                    )}

                    {state.simulationData && <SimulationView simulation={state.simulationData} />}

                    <Divider sx={{ borderStyle: 'dashed' }} />
                    <Stack direction={'row'} spacing={1}>
                        <TextField
                            fullWidth
                            name="completions"
                            label="Repeats"
                            onChange={(e) => {
                                setState((prevstate) => ({
                                    ...prevstate,
                                    batchRun: { ...prevstate.batchRun, completions: parseInt(e.target.value) },
                                }));
                            }}
                            value={state.batchRun.completions}
                            InputProps={{
                                // startAdornment: <InputAdornment position="start">[x]</InputAdornment>,
                                type: 'number',
                            }}
                        />

                        <TextField
                            fullWidth
                            name="parallelism"
                            label="Parallelism"
                            onChange={(e) => {
                                setState((prevstate) => ({
                                    ...prevstate,
                                    batchRun: { ...prevstate.batchRun, parallelism: parseInt(e.target.value) },
                                }));
                            }}
                            value={state.batchRun.parallelism}
                            InputProps={{
                                type: 'number',
                            }}
                        />
                    </Stack>
                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <TextField
                        name="name"
                        onChange={(e) => {
                            setState((prevstate) => ({
                                ...prevstate,
                                batchRun: { ...prevstate.batchRun, name: e.target.value },
                            }));
                        }}
                        label="name"
                        value={state.batchRun.name}
                        InputProps={{
                            type: 'string',
                        }}
                    />

                    <TextField
                        onChange={(e) => {
                            setState((prevstate) => ({
                                ...prevstate,
                                batchRun: { ...prevstate.batchRun, message: e.target.value },
                            }));
                        }}
                        rows={6}
                        fullWidth
                        multiline
                        value={state.batchRun.message}
                        name="message"
                        label="message"
                        InputProps={{
                            type: 'string',
                        }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                {/* <Button onClick={handleClose} variant="contained">
                    Run Simulation
                </Button> */}
                <Tooltip title={errorMessage}>
                    <Box>
                        <LoadingButton
                            // disabled={!submitable}
                            color={submitable ? 'primary' : 'error'}
                            type="submit"
                            variant="contained"
                            size="medium"
                            onClick={handleSubmit}
                        >
                            Run Simulation
                        </LoadingButton>
                    </Box>
                </Tooltip>
            </DialogActions>
        </>
    );
}
