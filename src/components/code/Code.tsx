// components/Code.js
import { IconButton, Tooltip } from '@mui/material';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Iconify from '../iconify';
import { useSnackbar } from '../../components/snackbar';
// hooks
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { PropsWithChildren } from 'react';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
    language: string;
    children: SyntaxHighlighterProps['children'];
};

export default function Code({ language, children }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

    const { copy } = useCopyToClipboard();

    const onCopy = (text: string) => {
        if (text) {
            enqueueSnackbar('Copied!');
            copy(text);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <SyntaxHighlighter
                language={language}
                style={theme.palette.mode === 'dark' ? materialDark : materialLight}
                customStyle={{ borderRadius: '10px' }}
            >
                {children}
            </SyntaxHighlighter>

            <Tooltip title="Copy" style={{ position: 'absolute', right: '15px', top: '13px' }}>
                <IconButton onClick={() => onCopy(children?.toString() as string)}>
                    <Iconify icon="eva:copy-fill" width={24} />
                </IconButton>
            </Tooltip>
        </div>
    );
}
