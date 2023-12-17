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
import axios from 'axios';
import SimulationDialog from './SimulationView';
import { BatchRun } from 'src/@types/repo';
import NewSimulationDialogsContent from './NewSimulationDialogsContent';
// ----------------------------------------------------------------------

type Props = {
    repoName?: string;
    branch?: string;
    simulation?: string;

    onSubmit: VoidFunction;
};

export default function NewSimulationFormDialogs(props: Props) {
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant={'contained'}
                color={'primary'}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                style={{ textTransform: 'none' }}
                // href={PATH_DASHBOARD.integration.simulation.run(projectName, simulationId)}
                onClick={handleClickOpen}
            >
                Run simulation
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <NewSimulationDialogsContent repoName={props.repoName} onClose={handleClose} {...props} />
            </Dialog>
        </>
    );
}
