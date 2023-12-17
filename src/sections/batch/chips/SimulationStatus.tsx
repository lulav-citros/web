// @mui
import {
    Box,
    Grid,
    Card,
    Stack,
    Typography,
    Paper,
    Chip,
    Table,
    TableContainer,
    IconButton,
    TableBody,
    Tooltip,
    TablePagination,
    FormControlLabel,
    Switch,
    Container,
    Link,
    Button,
} from '@mui/material';
// ----------------------------------------------------------------------
var status_data: any = {
    SCHEDULE: {
        tooltip: 'The simulation is beeing scheduled. should start soon.',
        color: 'default',
    },

    CREATING: {
        tooltip: 'The scheduler picked this action and starting creating the docker',
        color: 'default',
    },

    INIT: {
        tooltip: 'The docker is started. The simulation has begun initializing fase.',
        color: 'primary',
    },

    STARTING: {
        tooltip: 'The simulation is being started.',
        color: 'primary',
    },
    RUNNING: {
        tooltip: 'The simulation is running.',
        color: 'primary',
    },
    TERMINATING: {
        tooltip: 'The simulation agent got terminating event. starting termination sequance.',
        color: 'primary',
    },
    STOPPING: {
        tooltip: 'Waiting for the simulation to stop.',
        color: 'primary',
    },
    DONE: {
        tooltip: 'The simulation is done running.',
        color: 'success',
    },
    ERROR: {
        tooltip: 'The simulation halted with an error.',
        color: 'error',
    },
};
type Props = {
    status: string;
};
export default function SimulationStatus({ status }: Props) {
    const _status = status_data[status];
    return (
        <Tooltip title={_status.tooltip}>
            <Chip label={status} color={_status.color} variant="outlined" size="small" sx={{ my: 0.5 }} />
        </Tooltip>
    );
}
