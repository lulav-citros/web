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
        tooltip: 'The first stage of the test run. nothing happened yet. This is set by a trigger from user or CI/CD',
        color: 'default',
    },

    RUNNING: {
        tooltip: 'All simulations are in CREATING/INIT/STARTING/RUNNING status',
        color: 'primary',
    },
    TERMINATING: {
        tooltip: 'At least one of the related simulation_runs is in TERMINATING/STOPPING STATE',
        color: 'primary',
    },

    DONE: {
        tooltip: 'All related simulation_runs is in DONE state',
        color: 'success',
    },
    ERROR: {
        tooltip: 'All related simulation_runs is in DONE and at least one in ERROR state',
        color: 'error',
    },
};
type Props = {
    status: string;
};
export default function BatchStatus({ status }: Props) {
    const _status = status_data[status];
    return (
        <Tooltip title={_status.tooltip}>
            <Chip label={status} color={_status.color} variant="outlined" size="small" />
        </Tooltip>
    );
}
