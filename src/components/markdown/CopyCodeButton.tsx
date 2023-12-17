import React, { useCallback, useState } from 'react';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';

import { IconButton, Tooltip } from '@mui/material';
import { InlineIcon } from '@iconify/react';
import Iconify from '../iconify/Iconify';

interface CopyCodeButtonProps {
    code: string;
}

const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyCode = useCallback(() => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [code]);

    return (
        <Tooltip title={isCopied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton
                onClick={handleCopyCode}
                size="small"
                style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }}
            >
                <Iconify icon="material-symbols:content-copy" />
            </IconButton>
        </Tooltip>
    );
};

export default CopyCodeButton;
