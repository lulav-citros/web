import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';
import { Options } from 'react-markdown';

// ----------------------------------------------------------------------

export interface MarkdownWrapperProps extends Options {
    sx?: SxProps<Theme>;
    setFilePath?: (filePath: string) => void;
    staticImagePath?: string;
}

export interface CodeProps {
    node?: any;
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

export type MarkdownNode = {
    children: { value: string }[];
};

export interface MarkdownProps {
    data: string;
    setFilePath?: (filePath: string) => void;
}
