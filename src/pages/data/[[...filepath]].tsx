import Head from 'next/head';
import { Container } from '@mui/material';
import { MainLayout } from '../../layouts/repo';
import DataBrowser from 'src/components/data-browser/DataBrowser';
import { useRouter } from 'next/router';

DataList.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default function DataList() {
    const {asPath, query} = useRouter();

    // const repoName = query.repo_name as string;
    const prefix = typeof query.filepath == 'string' ? query.filepath : query.filepath?.join('/');

    return (
        <>
            <Head>
                <title> Data </title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>                
                <DataBrowser prefix={prefix}></DataBrowser>
            </Container>
        </>
    );
}
