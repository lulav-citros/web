import { Box, InputAdornment, TextField } from '@mui/material';
import NewImageDialog from 'src/components/citros/dialogs/NewImageDialog';

import Iconify from 'src/components/iconify';

type Props = {
    filter: string;
    onChange: (data: string | undefined) => void;
};

export function ImageDigestToolbar({ onChange, filter }: Props) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 2 }}>
            <TextField
                value={filter}
                autoComplete="off"
                id="imageDigestToolbatSearch"
                placeholder={'Find a tag...'}
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
