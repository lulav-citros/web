import React, { useMemo, useRef, useState } from 'react';
import { useCommitEditorContext } from '../CommitEditorContext';
import { toFileDataStringValue } from '../file.utils';
import { Box, IconButton, Link, List, ListItem, Popover, Stack, TextField } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

function extractHeaders(markdownData: string) {
    const headers: { level: number; title: string; id: string }[] = [];
    const codeBlockRegex = /```[\s\S]*?```/g;
    const cleanedData = markdownData.replace(codeBlockRegex, '');

    const lines = cleanedData.split('\n');
    lines.forEach((line) => {
        const match = line.match(/^(#+) (.+)/);
        if (match) {
            headers.push({
                level: match[1].length,
                title: match[2],
                id: match[2].toLowerCase().replace(/\s+/g, '-'),
            });
        }
    });

    return headers;
}

export default function FileDisplayToolbarMd() {
    const [tableOfContentsOpen, setTableOfContentsOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        state: { fileDataInitial },
    } = useCommitEditorContext();

    const fileDataStringValue = useMemo(() => toFileDataStringValue(fileDataInitial), [fileDataInitial]);
    const headers = extractHeaders(fileDataStringValue);
    const filteredHeaders = headers.filter((header) => header.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const componentRef = useRef<HTMLDivElement>(null);
    const handleClickOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setPopoverOpen(event.currentTarget);
        setTableOfContentsOpen(true);
    };
    const handlePopoverClose = () => {
        setPopoverOpen(null);
        setTableOfContentsOpen(false);
    };
    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            handlePopoverClose();
        }
    };

    const scrollToComponentTop = () => {
        if (componentRef.current) {
            const offsetTop = componentRef.current.getBoundingClientRect().top;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                px: 5,
                py: 1,
                backgroundColor: 'grey.850',
            }}
            ref={componentRef}
        >
            <Stack direction={'row'}>
                <IconButton
                    style={{
                        border: '1px solid rgb(45, 51, 58)',
                        borderRadius: '4px',
                        padding: '5px',
                    }}
                    onClick={handleClickOpenPopover}
                >
                    <Iconify icon="tabler:list" />
                </IconButton>
                <Link
                    component="button"
                    variant="h5"
                    color="inherit"
                    onClick={scrollToComponentTop}
                    style={{ marginLeft: '20px' }}
                >
                    Readme.md
                </Link>
            </Stack>
            <Popover
                open={tableOfContentsOpen}
                anchorEl={popoverOpen}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    '.MuiPopover-paper': {
                        width: '300px',
                        maxHeight: '450px',
                        overflowY: 'auto',
                    },
                }}
            >
                <Box p={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <List>
                        {filteredHeaders.map((header, index) => (
                            <ListItem key={index} style={{ marginLeft: 20 * (header.level - 1) }}>
                                <Link
                                    component="button"
                                    variant="body1"
                                    color={'inherit'}
                                    onClick={() => handleClick(header.id)}
                                >
                                    {header.title}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Popover>
        </Box>
    );
}
