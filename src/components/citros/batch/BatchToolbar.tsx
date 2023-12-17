import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import NewRepoDialog from '../dialogs/NewRepoDialogs';
import Iconify from 'src/components/iconify';
import NewSimulationFormDialogs from 'src/sections/batch/dialog/NewSimulationFormDialogs';
import { useEffect, useState } from 'react';
import NewBatchRunDialog from '../dialogs/NewBatchRunDialog';
import { useDebounce } from 'use-debounce';

type Props = {
    onFilter: (data: string) => void;
    refetch: () => void;
    repoName?: string;
};

export function BatchToolbar({ onFilter, refetch, repoName }: Props) {
    const [filter, setFileter] = useState('');
    const [debouncedFilter] = useDebounce(filter, 1000);

    useEffect(() => {        
        onFilter(debouncedFilter);
    }, [debouncedFilter]);

    return (
        <Box>
            <Box>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Batch runs
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {repoName ? 'Showing batch runs from ' + repoName : 'Showing batch runs from all repos'}
                </Typography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pt: 2, pb: 2 }}>
                <TextField
                    id="find-batch"
                    type="text"
                    placeholder={'Find batch run by name...'}
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
                />

                <NewSimulationFormDialogs repoName={repoName} simulation={undefined} onSubmit={() => refetch()} />
                <NewBatchRunDialog></NewBatchRunDialog>
            </Box>
        </Box>
    );
}
