import Head from 'next/head';
import { Container } from '@mui/material';
import { RepoLayout } from '../../../layouts/repo';
import DataBrowser from 'src/components/data-browser/DataBrowser';
import { useRouter } from 'next/router';

DataList.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

export default function DataList() {
    const {asPath, query} = useRouter();

    const repoName = query.repo_name as string;
    const prefix = typeof query.filepath == 'string' ? query.filepath : query.filepath?.join('/');

    // console.log("DataList", repoName, prefix)
    return (
        <>
            <Head>
                <title> Data </title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>                
                <DataBrowser repoName={repoName} prefix={prefix}></DataBrowser>
            </Container>
        </>
    );
}
