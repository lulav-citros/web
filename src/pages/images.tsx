import { useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MainLayout } from '../layouts/repo';
import { Image } from 'src/@types/registry';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { ImageToolbar } from 'src/components/repo/imageList/ImageToolbar';
import { ImageRow } from 'src/components/repo/imageList/ImageRow';
import { useCommitEditorRoute } from 'src/components/repo/editor/CommitEditor';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useAxios } from 'src/utils/useAxios';
import { ImageHeader } from 'src/components/repo/imageList/ImageHeader';

function filterData(list: Image[], filter: string): Image[] {
    // console.log("vovacooper");
    const filtered = list.filter((image) => image.name.toLowerCase().includes(filter.toLowerCase()));
    const sorted = filtered.sort((a, b) => {
        let aval = parseInt(a.updateTime.seconds as string); // * 1000000000 + (a.updateTime.nanos as number) ;
        let bval = parseInt(b.updateTime.seconds as string); // * 1000000000 + (b.updateTime.nanos as number) ;
        return bval - aval;
    });
    // console.log("sorted", sorted);
    return sorted;
}
// ----------------------------------------------------------------------

ImagesList.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------

export default function ImagesList() {
    const { user } = useAuthContext();
    const editorRoute = useCommitEditorRoute();

    if (!user || !editorRoute) {
        return <LoaderOverWidget />;
    }

    const [filter, setFileter] = useState('');

    const { cancel, data, error, loaded } = useAxios(`/api/artifactory`, 'GET');
   
    if (!loaded) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }

    // console.log("data", data)

    return (
        <>
            <Head>
                <title> images </title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <ImageToolbar onChange={(data) => setFileter(data as string)} />

                <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                    <ImageHeader />
                    {data &&
                        filterData(data, filter).map((image) => (
                            <ImageRow image={image} key={image.name} repoName={editorRoute.repoName} />
                        ))}
                </Box>
                {/* </CommitEditorContextProvider> */}
            </Container>
        </>
    );
}
