import React from 'react';
import { Grid } from '@mui/material';
import LoaderOverWidget from '../../../../loaderOverWidget';

export function BlobViewLoader() {
    return (
        <Grid
            container
            flexDirection={'column'}
            gap={0}
            position={'relative'}
            alignItems={'stretch'}
            flexShrink={0}
            width={'100%'}
            minHeight={'40vh'}
        >
            <LoaderOverWidget />
        </Grid>
    );
}
