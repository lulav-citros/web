import { useRouter } from 'next/router';
import React from 'react';
import { RepoLayout } from '../../layouts/repo';
// ----------------------------------------------------------------------

SimulationPage.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

export default function SimulationPage() {
    return <>Reports goes here!</>;
}
