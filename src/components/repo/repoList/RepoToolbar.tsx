import { Box, InputAdornment, TextField } from '@mui/material';
import NewRepoDialog from '../../citros/dialogs/NewRepoDialogs';
import Iconify from 'src/components/iconify';

type Props = {
    onChange: (data: string | undefined) => void;
};

export function RepoToolbar({ onChange }: Props) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
            <TextField
                id='find-repo'
                type='text'                
                placeholder={'Find a repository...'}
                size={'small'}
                fullWidth
                sx={{ flex: 1 }}
                onChange={(event) => onChange(event.target.value)}
                // inputProps={{ style: { height: '16px' } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="majesticons:search-line" width={24} />
                        </InputAdornment>
                    ),
                }}
            />
            <NewRepoDialog />            
        </Box>
    );
}
