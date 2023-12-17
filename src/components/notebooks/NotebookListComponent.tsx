import { useMemo } from 'react';
import { Card } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import getAppoloClinet from '../../utils/connectAppolo';
import { DELETE_NOTEBOOK_BY_ID, GET_NOTEBOOKS, UPSERT_NOTEBOOK } from '../../graphQL/notebook';
import DataGridNotebooks from './data-grid/DataGridNotebooks';
import { Notebook } from 'src/@types/notebook';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../routes/paths';
import LoaderOverWidget from '../loaderOverWidget';
// ----------------------------------------------------------------------

type Props = {
    projectId?: string;
    projectName?: string;
    simulationId?: string;
    batchRunId?: string;
    simulationRunId?: string;
};

export default function NotebookListComponent({
    projectId,
    projectName,
    simulationId,
    batchRunId,
    simulationRunId,
}: Props) {
    const { push } = useRouter();

    // Get the data from CiTROS GraphQL API
    const { loading, error, data, refetch } = useQuery(GET_NOTEBOOKS);
    if (error) {
        console.log('ERROR!', error);
    }
    // transform data to projects type
    const tableData = useMemo(() => {
        if (data == undefined) {
            return [];
        }
        console.log('reports:', loading, error, data);
        if (!error && !loading) {
            return data.notebooksList;
        }
    }, [data]);

    const handleOnDelete = async (notebook: Notebook) => {
        console.log('delete: ', notebook);
        const client = getAppoloClinet();
        const resp = await client.mutate({
            variables: {
                nbid: notebook.id,
            },
            mutation: DELETE_NOTEBOOK_BY_ID,
        });
        refetch();
    };

    const [saveNotebook, { loading: saving }] = useMutation<Notebook>(UPSERT_NOTEBOOK);

    const handleOnDuplicate = async ({ id, ...notebook }: Notebook) => {
        const { data } = await saveNotebook({
            variables: {
                param: {
                    notebook: {
                        name: notebook.name + '-duplicate',
                        userId: notebook.userId,
                        description: notebook.description,
                        projectId: notebook.project?.id || notebook.projectId,
                        content: notebook.content,
                    } as Partial<Notebook>,
                },
            },
        });

        const newNotebookId = (data as any)?.upsertNotebook?.notebook.id;
        push(PATH_DASHBOARD.notebook.view(newNotebookId));
    };

    return (
        <Card sx={{ height: '75vh', width: '100%', position: 'relative' }}>
            {saving && <LoaderOverWidget />}
            {/* <CardHeader title="Basic" sx={{ mb: 2 }} /> */}
            <DataGridNotebooks
                data={tableData}
                onDelete={handleOnDelete}
                onDuplicate={handleOnDuplicate}
                batchRunId={batchRunId}
                simulationRunId={simulationRunId}
            />
        </Card>
    );
}
