import { useCommitEditorContext } from '../CommitEditorContext';
import { useEffect, useMemo } from 'react';
import { findFileInFolder, toFileDataStringValue } from '../file.utils';
import Markdown from '../../../../markdown';
import { Box } from '@mui/material';
import { DEFAULT_MD_README } from '../consts';
import LoaderOverWidget from '../../../../loaderOverWidget';
import FileDisplayToolbarMd from './FileDisplayToolbarMd';
import { styled } from '@mui/material/styles';

export function TreeViewFolderReadmePreview() {
    const {
        isFolder,
        fileRoute: { filePath, branch, repoName },
        state: { loading, fileDataInitial },
        context: { organizationSlug },
        actions: { loadFile },
        gitRepository,
    } = useCommitEditorContext();

    const readmeFile = useMemo(() => {
        if (!gitRepository) return null;
        if (!isFolder) return null;
        return findFileInFolder(DEFAULT_MD_README, gitRepository, filePath);
    }, [gitRepository, filePath, isFolder]);

    useEffect(() => {
        if (!readmeFile) return;

        loadFile({
            repoName,
            organizationSlug,
            branch,
            filePath: `${filePath.join('/')}/${readmeFile.name}`,
            type: 'blob',
        });
    }, [readmeFile]);

    const fileDataStringValue = useMemo(() => toFileDataStringValue(fileDataInitial), [fileDataInitial]);

    if (loading) {
        return (
            <Box position={'relative'} height={'20vh'}>
                <LoaderOverWidget />
            </Box>
        );
    }

    if (!fileDataStringValue) {
        return null;
    }

    return (
        <Box sx={{ border: 1, borderColor: 'grey.800', borderRadius: 1, mt: 2 }}>
            <FileDisplayToolbarMd />
            <Markdown data={fileDataStringValue}></Markdown>
        </Box>
    );
}
