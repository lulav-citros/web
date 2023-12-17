import { useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, TablePagination } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_BATCH_RUNS, GET_BATCH_RUNS } from 'src/graphQL/repos';
import { BatchRow } from 'src/components/citros/batch/BatchRow';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import { BatchRun } from 'src/@types/repo';
import { BatchToolbar } from './BatchToolbar';

interface Props {
    initialFilter?: string;
    repoName?: string;
}

export default function BatchRunsList({ initialFilter, repoName }: Props) {
    const [filter, setFileter] = useState<string>(initialFilter || '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(10);

    let variables = {
        first: rowsPerPage,
        offset: page * rowsPerPage,
        filter: filter,
        repoName: repoName,
    };

    let query = repoName ? GET_BATCH_RUNS : GET_ALL_BATCH_RUNS;

    const { loading, error, data, refetch } = useQuery(query, { variables: variables });
    if (error) {
        console.error('ERROR!', error);
    }

    const tableData = useMemo(() => {
        if (data == undefined) {
            return;
        }
        if (!error && !loading) {
            let batch_list: BatchRun[] = [];

            if (repoName) {
                if (data.reposList.length == 0) {
                    return;
                }
                for (let i = 0; i < data.reposList.length; i++) {
                    for (let j = 0; j < data.reposList[i].batchRuns.edges.length; j++) {
                        batch_list.push({
                            ...data.reposList[i].batchRuns.edges[j].node,
                        });
                    }
                }
                setTotalCount(data.reposList[0].batchRuns.totalCount);
            } else {
                for (let i = 0; i < data.batchRuns.edges.length; i++) {
                    batch_list.push({
                        ...data.batchRuns.edges[i].node,
                    });
                }
                setTotalCount(data.batchRuns.totalCount);
            }

            // console.log("batch_list", batch_list);
            return batch_list;
            // return batch_list.sort((a, b) => {
            //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            // });
        }
    }, [data]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);

        // console.log('newPage', newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

        // console.log('RowsPerPage', parseInt(event.target.value, 10));
    };

    const handleOnFilter = (data: String) => {
        setFileter(data as string);
        setPage(0);

        // console.log('handleOnFilter', data);
    };

    return (
        <>
            <Head>
                <title> Batch runs for {repoName} </title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <BatchToolbar onFilter={handleOnFilter} refetch={refetch} repoName={repoName} />

                <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                    {tableData && tableData.map((batchRun) => <BatchRow batchRun={batchRun} key={batchRun.id} />)}
                </Box>

                {loading ? (
                    <LoaderOverWidget />
                ) : (
                    <TablePagination
                        component="div"
                        count={totalCount}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Container>
        </>
    );
}
