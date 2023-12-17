import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RepoLayout } from '../../layouts/repo';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { useCommitEditorRoute } from 'src/components/repo/editor/CommitEditor';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useAxios } from 'src/utils/useAxios';
import { ImageToolbar } from 'src/components/repo/imageList/ImageToolbar';
import { ImageDigest } from 'src/@types/registry';
import { ImageHeader } from 'src/components/repo/imageList/ImageHeader';
import { ImageDigestRow } from 'src/components/repo/imageDigestList/ImageDigestRow';
import { ImageDigestHeader } from 'src/components/repo/imageDigestList/ImageDigestHeader';
import { ImageDigestToolbar } from 'src/components/repo/imageDigestList/ImageDigestToolbar';
import { useRouter } from 'next/router';

function filterData(list: ImageDigest[], filter: string): ImageDigest[] {
    return list.filter((image) => {
        const tags = image.relatedTags.filter((tag) => {
            return tag.name.split('/').pop()!.includes(filter.toLowerCase());
        });
        return tags.length > 0;
    });
}

// ----------------------------------------------------------------------

ImagesList.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

// ----------------------------------------------------------------------

export default function ImagesList() {
    const { user } = useAuthContext();
    const editorRoute = useCommitEditorRoute();
    const { query } = useRouter();
    const { tag } = query;

    // console.log('tag', tag);

    if (!user || !editorRoute) {
        return <LoaderOverWidget />;
    }

    const [filter, setFileter] = useState(typeof tag == 'string' ? tag : '');

    const { cancel, data, error, loaded } = useAxios(`/api/artifactory/${editorRoute.repoName}`, 'GET');

    if (!loaded) {
        return <LoaderOverWidget></LoaderOverWidget>;
    }

    // console.log('data', data);

    return (
        <>
            <Head>
                <title> {editorRoute.repoName} - images</title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <ImageDigestToolbar filter={filter} onChange={(data) => setFileter(data as string)} />

                <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                    <ImageDigestHeader />
                    {data &&
                        filterData(data, filter).map((imageDigest) => (
                            <ImageDigestRow
                                imageDigest={imageDigest}
                                key={imageDigest.name}
                                repoName={editorRoute.repoName}
                            />
                        ))}
                </Box>
                {/* </CommitEditorContextProvider> */}
            </Container>
        </>
    );
}
