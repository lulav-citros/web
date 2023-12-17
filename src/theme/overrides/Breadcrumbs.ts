import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Breadcrumbs(theme: Theme) {
    return {
        MuiBreadcrumbs: {
            styleOverrides: {
                separator: {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                },
                li: {
                    display: 'inline-flex',
                    margin: theme.spacing(0.25, 0),
                    '& > *': {
                        ...theme.typography.body2,
                    },
                },
            },
        },
    };
}
