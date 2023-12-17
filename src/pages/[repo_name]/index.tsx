import React, { useMemo } from 'react';
import Head from 'next/head';
import {
    CommitEditorContextProvider,
    useCommitEditorContext,
    useCommitEditorRoute,
} from '../../components/repo/editor/CommitEditor';
import { useAuthContext } from '../../auth/useAuthContext';
import { RepoLayout } from 'src/layouts/repo';
import { Box, Container } from '@mui/material';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import TreeView from '../../components/repo/editor/CommitEditor/TreeView';
import { useRouter } from 'next/router';
import { ChangeBranch } from 'src/components/repo/editor/CommitEditor/FileDisplay/Toolbar/components/ChangeBranch';
import { DEFAULT_BRANCH } from 'src/config';

FilePathPage.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

export default function FilePathPage() {
    const { user } = useAuthContext();
    const editorRoute = useCommitEditorRoute();

    if (!user || !editorRoute) {
        return <LoaderOverWidget />;
    }

    return (
        <>
            <Head>
                <title>
                    {user?.organization?.slug + '/' + editorRoute.repoName} - {editorRoute.branch}
                </title>
            </Head>

            <Container>
                <Box sx={{ mt: 3 }}>
                    <CommitEditorContextProvider
                        context={{
                            name: user?.firstName,
                            email: user?.email,
                            organizationSlug: user?.organization?.slug,
                        }}
                        fileRoute={{
                            ...editorRoute,
                            branch: DEFAULT_BRANCH,
                            type: 'tree',
                        }}
                    >
                        <Box sx={{ width: '200px', pb: 2 }}>
                            <ChangeBranch />
                        </Box>

                        {/* <Box sx={{ border: 1, borderColor: 'grey.800', borderRadius: 1 }}> */}
                        <TreeView />
                        {/* </Box> */}

                        {/*<Box sx={{ border: 1, borderColor: 'grey.800', borderRadius: 1, mt: 2 }}>*/}
                        {/*    <FileDisplayToolbarMd />*/}
                        {/*    <TreeViewFolderReadmePreview />*/}
                        {/*</Box>*/}
                    </CommitEditorContextProvider>
                </Box>
            </Container>
        </>
    );
}
