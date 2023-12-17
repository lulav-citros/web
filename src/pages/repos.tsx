import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Repo } from '../@types/repo';
import { MainLayout } from '../layouts/repo';
import { gql, useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphQL/repos';
import { RepoRow } from 'src/components/repo/repoList/RepoRow';
import { RepoToolbar } from 'src/components/repo/repoList/RepoToolbar';
import LoaderOverWidget from 'src/components/loaderOverWidget';

function filterData(list: Repo[], filter: string): Repo[] {
    return list.filter((repo) => repo.name.toLowerCase().includes(filter.toLowerCase()));
}

RepoList.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default function RepoList() {
    const [filter, setFileter] = useState('');

    // Get the data from CiTROS GraphQL API
    const { loading, error, data } = useQuery(GET_REPOS);
    if (error) {
        console.log('ERROR!', error);
    }
    // transform data to Repos type
    const tableData = useMemo(() => {
        if (data == undefined) {
            return [];
        }

        let reposList: Repo[] = [];
        for (let i = 0; i < data.reposList.length; i++) {
            reposList.push({
                ...data.reposList[i],
                batchRunsCount: data.reposList[i].batchRunsCount.totalCount,
                batchRunsCountDone: data.reposList[i].batchRunsCountDone.totalCount,
            });
        }
        if (!error && !loading) {
            return reposList;
        }
    }, [data]);

    if (loading) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }

    return (
        <>
            <Head>
                <title> integration: Repo List</title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <RepoToolbar onChange={(data) => setFileter(data as string)} />

                <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                    {tableData && filterData(tableData, filter).map((repo) => <RepoRow repo={repo} key={repo.id} />)}
                </Box>
            </Container>
        </>
    );
}
