import '../../utils/highlight';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import NextLink from 'next/link';
import { Divider, Link, Typography, Box, IconButton, Tooltip } from '@mui/material';
import Image from '../image';
import StyledMarkdown from './styles';
import { MarkdownWrapperProps, MarkdownProps } from './types';
// import { MonacoColorize } from '../monaco/MonacoColorize';
import { useEffect, useMemo, useState } from 'react';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { CodeEditor } from '../monaco';
import CopyCodeButton from './CopyCodeButton'; // Adjust path as necessary

interface CustomCodeProps {
    node: any;
    className?: string;
    children: React.ReactNode;
    inline?: boolean;
}

export default function Markdown({ data = '', setFilePath }: MarkdownProps) {
    const transformedData = data.replace(/{#(.*?)}/g, '\n\n# -HIDDEN-HEADER-$1');

    return (
        <Box>
            <div className="custom-markdown">
                <MarkdownWrapper sx={{ p: 2 }} setFilePath={setFilePath}>
                    {transformedData}
                </MarkdownWrapper>
            </div>
        </Box>
    );
}

function MarkdownWrapper({ sx, setFilePath, staticImagePath, ...other }: MarkdownWrapperProps) {
    const plugins = useMemo(() => [rehypeRaw, remarkMath, rehypeKatex, gfm], []);
    const [fragment, setFragment] = useState<string | null>(null);

    useEffect(() => {
        if (fragment) {
            const element = document.getElementById(fragment);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [fragment]);

    return (
        <StyledMarkdown sx={sx}>
            <ReactMarkdown
                rehypePlugins={plugins}
                components={components(setFilePath, setFragment, staticImagePath)}
                {...other}
            />
        </StyledMarkdown>
    );
}

function extractDocusaurusAnchor(value: string): string | null {
    const match = value.match(/{#(.+?)}/);
    if (match) {
        return match[1];
    }
    return null;
}

const components = (
    setFilePath: (path: string) => void = () => {},
    setFragment: (fragment: string | null) => void,
    staticImagePath?: string
) => ({
    h1: ({ ...props }) => {
        const headerValue = String(props.node.children[0].value);
        const isHiddenHeader = headerValue.startsWith('-HIDDEN-HEADER-');

        return (
            <Typography
                variant="h2"
                id={headerValue.toLowerCase().replace(/\s+/g, '-')}
                gutterBottom
                {...props}
                style={{ display: isHiddenHeader ? 'none' : undefined }}
            />
        );
    },
    h2: ({ ...props }) => (
        <Typography
            variant="h3"
            id={String(props.node.children[0].value).toLowerCase().replace(/\s+/g, '-')}
            gutterBottom
            {...props}
        />
    ),
    h3: ({ ...props }) => (
        <Typography
            variant="h4"
            id={String(props.node.children[0].value).toLowerCase().replace(/\s+/g, '-')}
            gutterBottom
            {...props}
        />
    ),
    h4: ({ ...props }) => (
        <Typography
            variant="h5"
            id={String(props.node.children[0].value).toLowerCase().replace(/\s+/g, '-')}
            gutterBottom
            {...props}
        />
    ),
    h5: ({ ...props }) => (
        <Typography
            variant="h6"
            id={String(props.node.children[0].value).toLowerCase().replace(/\s+/g, '-')}
            gutterBottom
            {...props}
        />
    ),
    h6: ({ ...props }) => <Typography variant="subtitle1" id={props.node.children[0].value} gutterBottom {...props} />,
    code: ({ node, className, children, inline, ...props }: CustomCodeProps) => {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'plaintext';
        if (inline) {
            if (typeof children === 'string') {
                const anchorId = extractDocusaurusAnchor(children);
                if (anchorId) {
                    return (
                        <Typography variant="subtitle1" id={anchorId} style={{ display: 'none' }}>
                            {children}
                        </Typography>
                    );
                }
            }
            return <code>{children}</code>;
        }
        return (
            <Box style={{ position: 'relative' }}>
                <CodeEditor
                    value={String(children).replace(/\n$/, '')}
                    onChange={() => {}}
                    readOnly={true}
                    defaultLanguage={language}
                />
                <CopyCodeButton code={String(children).replace(/\n$/, '')} />
            </Box>
        );
    },

    inlineCode: ({ children }: { children: string }) => {
        const anchorId = extractDocusaurusAnchor(children);
        if (anchorId) {
            return (
                <Typography variant="subtitle1" id={anchorId} style={{ display: 'none' }}>
                    {children}
                </Typography>
            );
        }
        return <code>{children}</code>;
    },
    a: ({ ...props }) => {
        const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            if (props.href.startsWith('#')) {
                const destination = props.href.substring(1);
                setFragment(destination);
            } else if (!props.href.startsWith('http')) {
                const [newFilePath, fragment] = props.href.split('#');
                setFilePath('/docs/docs_data_analysis/' + newFilePath);
                if (fragment) {
                    setFragment(fragment);
                }
            }
        };

        return props.href.startsWith('http') ? (
            <Link target="_blank" rel="noopener" {...props} />
        ) : (
            <Link component={NextLink} href={props.href.split('#')[0]} passHref {...props} onClick={handleClick}>
                {props.children}
            </Link>
        );
    },
    img: ({ src, ...props }: { src?: string; alt?: string }) => {
        const fullSrcPath = src ? `${staticImagePath ? staticImagePath : ''}/${src}` : '';

        return (
            <Image
                src={fullSrcPath}
                alt={props.alt}
                sx={{ borderRadius: 2, my: 5 }}
                {...props}
                onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = '/assets/icons8-no-image-100.png';
                    target.alt = 'Image not found';
                }}
            />
        );
    },
});
