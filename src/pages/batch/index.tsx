import { MainLayout } from '../../layouts/repo';
import { useCommitEditorRoute } from 'src/components/repo/editor/CommitEditor';
import BatchRunsList from 'src/components/citros/batch/BatchRunsList';

SimulationBatchRunsListPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default function SimulationBatchRunsListPage() {
    return <BatchRunsList  ></BatchRunsList>;
}
