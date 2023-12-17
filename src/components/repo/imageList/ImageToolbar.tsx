import { Box, InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import NewImageDialog from 'src/components/citros/dialogs/NewImageDialog';

type Props = {
    onChange: (data: string | undefined) => void;
};

export function ImageToolbar({ onChange }: Props) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
            <TextField                
                id='imageToolbatSearch'                
                type='text'
                autoComplete="off"
                placeholder={'Find an image...'}
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
            <NewImageDialog />
        </Box>
    );
}
