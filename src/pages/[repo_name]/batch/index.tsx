import { RepoLayout } from '../../../layouts/repo';
import { useCommitEditorRoute } from 'src/components/repo/editor/CommitEditor';
import BatchRunsList from 'src/components/citros/batch/BatchRunsList';

SimulationBatchRunsListPage.getLayout = function getLayout(page: React.ReactElement) {
    return <RepoLayout>{page}</RepoLayout>;
};

export default function SimulationBatchRunsListPage() {
    const editorRoute = useCommitEditorRoute();

    return <BatchRunsList repoName={editorRoute.repoName}></BatchRunsList>;
}
