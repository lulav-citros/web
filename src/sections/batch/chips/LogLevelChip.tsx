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
var log_level: any = {
    DEBUG: {
        color: 'success',
    },
    INFO: {
        color: 'info',
    },
    WARNING: {
        color: 'warning',
    },
    WARN: {
        color: 'warning',
    },
    ERROR: {
        color: 'error',
    },
    FATAL: {
        color: 'error',
    },
    CRITICAL: {
        color: 'error',
    },
};
type Props = {
    level: string;
};
export default function LogLevelChip({ level }: Props) {
    // console.log("LogLevel: ", level)
    const _level = log_level[level];
    return <Chip label={level} color={_level ? _level.color : 'default'} variant="outlined" size="small" />;
}
