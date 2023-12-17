import { useTheme } from '@mui/material/styles';
import { CircularProgress, Grid, Typography } from '@mui/material';

export function JupyterTextLoader({ text }: { text: string }) {
    const theme = useTheme();

    return (
        <Grid container gap={1} alignItems={'center'} flexWrap={'nowrap'}>
            <CircularProgress color={'inherit'} sx={{ color: theme.palette.text.disabled }} size={12} />
            <Typography variant={'body2'} color={theme.palette.text.disabled}>
                {text}
            </Typography>
        </Grid>
    );
}
