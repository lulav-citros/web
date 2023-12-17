import React from 'react';
import { Stack } from '@mui/material';
import { bgBlur } from '../../../../../../utils/cssStyles';

export function FileContentToolbar({ children }: any) {
    return (
        <Stack
            spacing={2}
            padding={1}
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={(theme) => ({
                borderBottom: '1px solid',
                borderBottomColor: 'grey.800',
                ...bgBlur({
                    color: theme.palette.background.file_header,
                }),
            })}
        >
            {children}
        </Stack>
    );
}
