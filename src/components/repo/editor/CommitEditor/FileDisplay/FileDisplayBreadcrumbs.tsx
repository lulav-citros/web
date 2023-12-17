import React from 'react';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useCommitEditorContext } from '../CommitEditorContext';
import NextLink from 'next/link';
import { PATH_REPO } from 'src/routes/paths';

export function FileDisplayBreadcrumbs() {
    const {
        fileRoute: { filePath, repoName, branch },
    } = useCommitEditorContext();

    return (
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
            <Breadcrumbs separator={'/'}>
                {filePath.map((section, index, list) => {
                    const isLast = list.length - 1 === index;
                    const href = list.slice(0, index + 1).join('/');

                    if (isLast) {
                        return (
                            <Typography color={'text.primary'} key={index}>
                                {section}
                            </Typography>
                        );
                    }
                    return (
                        <Link component={NextLink} href={PATH_REPO.tree(repoName, branch, href)} passHref key={index}>
                            {section}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Stack>
    );
}
