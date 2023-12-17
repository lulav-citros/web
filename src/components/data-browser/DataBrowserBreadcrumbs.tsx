import React from 'react';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { PATH_DATA, PATH_REPO } from 'src/routes/paths';
import { IBrowserItem } from './types';

type Props = {
    repoName?: string;
    prefix?: string;
};

export function DataBrowserBreadcrumbs({ repoName, prefix }: Props) {
    return (
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
            <Breadcrumbs separator={'/'}>
                {repoName && (
                    <Link href={PATH_REPO.data(repoName, '')} key={repoName}>
                        {repoName}
                    </Link>
                )}

                {!repoName && (
                    <Link href={PATH_DATA.root} key={'data'}>
                        data
                    </Link>
                )}

                {prefix?.split('/').map((section, index, list) => {
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
                        <Link href={repoName ? PATH_REPO.data(repoName, href) : PATH_DATA.view(href)} key={index}>
                            {section}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Stack>
    );
}
