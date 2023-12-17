import { Box, Chip, LinearProgress, Link, Stack, Tooltip, Typography } from '@mui/material';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
import { SimulationRun } from 'src/@types/repo';
import { PATH_BATCH, PATH_REPO } from 'src/routes/paths';
import BatchStatus from 'src/sections/batch/chips/BatchStatus';
import { fDateTimeShort } from 'src/utils/formatTime';

type Props = {};
export function SimulationHeader({}: Props) {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                backgroundColor: 'grey.850',
            }}
        >
            <Stack direction={'row'} spacing={1} flex={3}>
                <Typography sx={{ maxWidth: '20px', pr: 2 }} variant="body2" color="text.secondary">
                    ID
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Last message
                </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" flex={1}>
                Status
            </Typography>

            <Typography variant="body2" color="text.secondary" flex={1}>
                View
            </Typography>

            <Typography variant="body2" color="text.secondary" flex={1}>
                Created
            </Typography>
        </Box>
    );
}
