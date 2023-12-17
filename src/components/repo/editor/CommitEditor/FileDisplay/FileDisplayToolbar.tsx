import React, { PropsWithChildren } from 'react';
import { Stack } from '@mui/material';
import DocumentationDrawerComponent from 'src/components/documentation-drawer/DocumentationDrawer';

export function FileDisplayToolbar({ children }: PropsWithChildren) {
    return (
        <Stack flexDirection={'row'} sx={{ gap: 2, my: 0, alignItems: 'center' }}>
            {children}            
        </Stack>
    );
}
