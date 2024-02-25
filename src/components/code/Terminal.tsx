// components/Code.js
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Iconify from '../iconify';
import { useSnackbar } from '../snackbar';
// hooks
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { PropsWithChildren } from 'react';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Terminal({ children }: PropsWithChildren) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: 1,
                overflow: 'hidden',
                border: '0.1px solid grey',
                margin: '40px',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderBottom: '0.1px solid grey',
                }}
            >
                <Stack direction={'row'}>
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <svg width={20} height={20} viewBox="0px 0px 20px 20px" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10px" cy="10px" r="8px" fill="#ff5f57" />
                        </svg>
                    </Box>
                    <Box sx={{ pt: 1, pl: 0.5 }}>
                        <svg width={20} viewBox="0px 0px 20px 20px" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10px" cy="10px" r="8px" fill="#fdbc2c" />
                        </svg>
                    </Box>
                    <Box sx={{ pt: 1, pl: 0.5 }}>
                        <svg width={20} viewBox="0px 0px 20px 20px" fill="#28c840" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10px" cy="10px" r="8px" />
                        </svg>
                    </Box>
                </Stack>
            </Box>
            {/* <Image sx={{ borderRadius: 1 }} disabledEffect alt="rocket" src="/assets/images/home/gifs/tree.gif" /> */}
            <div style={{ position: 'relative' }}>
                {/* <SyntaxHighlighter
                language="python"
                style={materialDark}
                customStyle={{ margin: 0, borderRadius: 0, backgroundColor: 'black' }}
            >
                {children}
            </SyntaxHighlighter> */}
                <Box sx={{ padding: '10px', textAlign: 'left' }}>{children}</Box>
            </div>
        </Box>
    );
}
