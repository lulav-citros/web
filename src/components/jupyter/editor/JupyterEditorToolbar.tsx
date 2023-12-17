import { useTheme } from '@mui/material/styles';
import { useIsSticky } from '../../sticky-nav';
import { Grid } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import { JupyterEditorMenu } from './JupyterEditorMenu';
import { KernelMenu } from './KernelMenu';

export function JupyterEditorToolbar() {
    const theme = useTheme();
    const isSticky = useIsSticky();

    return (
        <Grid
            container
            justifyContent={'space-between'}
            flexWrap={'nowrap'}
            alignItems={'center'}
            sx={{
                ...(isSticky
                    ? {
                          ...bgBlur({
                              color: theme?.palette.background.default,
                          }),
                          padding: theme.spacing(1, 0, 1, 0),
                          borderRadius: '0 0 10px 10px',
                      }
                    : {}),
            }}
        >
            <Grid item>
                <JupyterEditorMenu />
            </Grid>
            <Grid item>
                <KernelMenu />
            </Grid>
        </Grid>
    );
}
