import React from 'react';
import { RepoLayout } from '../../../../layouts/repo';
import Head from 'next/head';
import {
    CommitContext,
    CommitEditor,
    generateCommitEditorRouteTitle,
    useCommitEditorRoute,
} from '../../../../components/repo/editor/CommitEditor';
import { useAuthContext } from '../../../../auth/useAuthContext';

FilePathPage.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

export default function FilePathPage() {
    const { user } = useAuthContext();
    const editorRoute = useCommitEditorRoute();

    const commitContext: CommitContext = {
        organizationSlug: user?.organization?.slug || '',
        email: user.email,
        name: user.name,
    };

    return (
        <>
            <Head>
                <title>{generateCommitEditorRouteTitle(commitContext, editorRoute)}</title>
            </Head>

            <CommitEditor
                context={{
                    name: user?.firstName,
                    email: user?.email,
                    organizationSlug: user?.organization?.slug,
                }}
                fileRoute={editorRoute}
            />
        </>
    );
}
