import React, { useState } from 'react';
import useGetFiles from './useGetFiles';
import LoaderOverWidget from '../loaderOverWidget/LoaderOverWidget';
import { Box } from '@mui/material';
import { RowItem } from './RowItem';
import { DataBrowserBreadcrumbs } from './DataBrowserBreadcrumbs';
import { DataBrowserToolbar } from './DataBrowserToolbar';
import { IBrowserItem } from './types';
import { DataBrowserHeader } from './DataBrowserHeader';

function filterData(list: IBrowserItem[], filter: string): IBrowserItem[] {
    return list.filter((repo) => repo.filename.toLowerCase().includes(filter.toLowerCase()));
}

interface Props {
    prefix?: string;
    repoName?: string;
}

export default function DataBrowser({ repoName, prefix }: Props) {
    const { cancel, files, error, loaded } = useGetFiles(repoName ? `${repoName}/${prefix || ''}` : prefix || '');
    const [filter, setFileter] = useState<string>('');

    if (!loaded) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }
    if (error) {
        return <>{'ERROR! ' + error}</>;
    }
    return (
        <>
            <DataBrowserToolbar onFilter={(data) => setFileter(data as string)}></DataBrowserToolbar>
            <DataBrowserBreadcrumbs repoName={repoName} prefix={prefix}></DataBrowserBreadcrumbs>
            <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                <DataBrowserHeader></DataBrowserHeader>
                {files &&
                    filterData(files, filter).map((item) => <RowItem repoName={repoName} item={item} key={item.id} />)}
            </Box>
        </>
    );
}
