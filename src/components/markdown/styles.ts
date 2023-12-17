import { styled } from '@mui/material/styles';

const StyledMarkdown = styled('div')(({ theme }) => {
    return {
        '& ul, & ol': {
            ...theme.typography.body1,
            paddingLeft: theme.spacing(5),
            '& li': {
                lineHeight: 2,
            },
        },
        '& blockquote': {
            padding: theme.spacing(0, 2),
            margin: 0,
            borderLeft: `2px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            backgroundColor: 'transparent',
            '& p, & span': {
                marginBottom: 0,
                color: `${theme.palette.text.primary} !important`,
                fontFamily: `${theme.typography.fontFamily} !important`,
            },
            '&:before': {
                content: 'none',
            },
        },
        '& pre': {
            ...theme.typography.body1,
            overflowX: 'auto',
            whiteSpace: 'pre',
            padding: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            border: `0.5px solid ${theme.palette.divider}`,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        '& pre > code': {
            ...theme.typography.body1,
            whiteSpace: 'pre',
            color: theme.palette.text.primary,
            backgroundColor: 'transparent',
            border: 'none',
        },
        '& code': {
            ...theme.typography.body1,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            backgroundColor: theme.palette.action.hover,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(0.2, 0.4),
            margin: 0,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            '&.hljs': {
                padding: 0,
                backgroundColor: 'transparent',
            },
        },
        '& table': {
            width: '100%',
            borderSpacing: 0,
            borderCollapse: 'collapse',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            backgroundColor: theme.palette.action.hover,
            overflow: 'hidden',
            '& th, & td': {
                padding: theme.spacing(1),
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'left',
            },
            '& th': {
                backgroundColor: theme.palette.action.selected,
            },
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.focus,
            },
            '& tbody tr:nth-of-type(even)': {
                backgroundColor: theme.palette.action.selected,
            },
        },
        '& details': {
            fontSize: '1.1em',
            marginTop: 5,
            marginBottom: 5,
            padding: 5,
            borderRadius: theme.shape.borderRadius,
        },
        '& img': {
            width: 'auto',
            height: 'auto',
        },
    };
});

export default StyledMarkdown;
