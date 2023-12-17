import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import NewSimulationFormDialogs from 'src/sections/batch/dialog/NewSimulationFormDialogs';
import { useEffect, useState } from 'react';

type Props = {
    onFilter: (data: string) => void;
};

export function DataBrowserToolbar({ onFilter }: Props) {
    const [filter, setFileter] = useState('');

    useEffect(() => {
        onFilter(filter);
    }, [filter]);

    return (
        <Box>
            <Box>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Files
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {'Showing files '}
                </Typography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pt: 2, pb: 2 }}>
                <TextField
                    id="find-batch"
                    type="text"
                    placeholder={'Find files by name...'}
                    size={'small'}
                    fullWidth
                    sx={{ flex: 1 }}
                    onChange={(event) => setFileter(event.target.value)}
                    // inputProps={{ style: { height: '16px' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="majesticons:search-line" width={16} />
                            </InputAdornment>
                        ),
                    }}
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            onFilter(filter);
                        }
                    }}
                />
                {/* <Button
                    variant={'contained'}
                    color={'primary'}
                    startIcon={<Iconify icon={'solar:filter-outline'} />}
                    style={{ textTransform: 'none' }}
                    // href={PATH_DASHBOARD.integration.simulation.run(projectName, simulationId)}
                    onClick={() => onFilter(filter)}
                >
                    Filter
                </Button> */}
            </Box>
        </Box>
    );
}
