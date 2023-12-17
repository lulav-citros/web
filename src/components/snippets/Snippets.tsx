import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Markdown from '../markdown/Markdown';
import LoaderOverWidget from '../loaderOverWidget';

type SetContentFunction = (content: string) => void;

export function Snippets() {
    const [loading, setLoading] = useState(false);
    const [snippets, setSnippets] = useState('');

    const fetchMarkdown = async (filename: string, setContent: SetContentFunction): Promise<void> => {
        try {
            const response = await fetch(`/${filename}.md`);
            if (!response.ok) {
                throw new Error('An error occurred while fetching the markdown file');
            }
            const text = await response.text();
            setContent(text);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Promise.all([fetchMarkdown('snippets/snippets', setSnippets)]).then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box sx={{ position: 'relative', height: '50vh' }}>
                <LoaderOverWidget />
            </Box>
        );
    }

    return (
        <Box>
            <Markdown data={snippets} />
        </Box>
    );
}
