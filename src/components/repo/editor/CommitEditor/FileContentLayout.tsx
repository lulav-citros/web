import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export function FileContentLayout({ children }: PropsWithChildren) {
    return <Box sx={{ border: '1px solid', borderColor: 'grey.800', borderRadius: 1 }}>{children}</Box>;
}
