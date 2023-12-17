import { Box, Typography } from '@mui/material';

export function DataBrowserHeader() {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.850',
                backgroundColor: 'grey.850',
                padding: 1,
                pl: 2,
                // ':hover': {
                //     cursor: 'pointer',
                //     backgroundColor: 'grey.850',
                // },
            }}
        >
            <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{minWidth: '200px', maxWidth: '500px'}}>
                {/* <Iconify icon={'teenyicons:docker-outline'} width={16} /> */}
                <Typography variant="body2">name</Typography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                size
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography minWidth={100} variant="body2">
                    created
                </Typography>
                {/* <Typography minWidth={100} variant="body2">
                    updated
                </Typography> */}
            </Box>
        </Box>
    );
}
