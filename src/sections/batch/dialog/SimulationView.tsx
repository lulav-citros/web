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
import { Simulation } from 'src/@types/test';
// ----------------------------------------------------------------------

type Props = {
    simulation?: Simulation;
};

export default function SimulationView({ simulation }: Props) {
    return (
        <>
            {simulation && (
                <Stack direction={'column'} spacing={1}>
                    <Grid item xs={12} md={9}>
                        <Stack spacing={3}>
                            <Paper key={'disabled'} variant="outlined" sx={{ ml: 10, p: 3, borderRadius: 1 }}>
                                <Typography gutterBottom variant="body2" sx={{ color: `text.primary` }}>
                                    {simulation.name}
                                </Typography>

                                <Stack direction={'row'} spacing={2}>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.secondary` }}>
                                        Description:
                                    </Typography>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.disabled` }}>
                                        {simulation.description}
                                    </Typography>
                                </Stack>

                                <Stack direction={'row'} spacing={2}>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.secondary` }}>
                                        launch:
                                    </Typography>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.disabled` }}>
                                        {simulation.launch.package}/{simulation.launch.file}
                                    </Typography>
                                </Stack>

                                <Stack direction={'row'} spacing={2} sx={{ mb: 2 }}>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.secondary` }}>
                                        parameter setup:
                                    </Typography>
                                    <Typography gutterBottom variant="body2" sx={{ color: `text.disabled` }}>
                                        {simulation.parameter_setup}
                                    </Typography>
                                </Stack>

                                <Stack direction={'row'} spacing={1} sx={{ mb: 2 }}>
                                    <TextField name="CPU" label="CPU" value={simulation.CPU} disabled={true} />
                                    <TextField name="GPU" label="GPU" value={simulation.GPU} disabled={true} />
                                    <TextField
                                        // label={simdata.MEMORY ? "" : "MEMORY"}

                                        name="MEMORY"
                                        label="MEMORY"
                                        value={simulation.MEM}
                                        disabled={true}
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={1}>
                                    <TextField
                                        fullWidth
                                        name="storage_type"
                                        label="storage_type"
                                        value={simulation.storage_type}
                                        disabled={true}
                                    />
                                    <TextField
                                        fullWidth
                                        name="timeout"
                                        label="timeout"
                                        value={simulation.timeout}
                                        disabled={true}
                                    />
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Stack>
            )}
        </>
    );
}
