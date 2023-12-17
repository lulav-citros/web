// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// @mui
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarQuickFilter } from '@mui/x-data-grid';
// utils
// components
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useRouter } from 'next/router';

import { useSnackbar } from '../../../components/snackbar';

// @types
import { fDate, fDateTimeShort } from '../../../utils/formatTime';
import ManueItemListMenue from 'src/components/menu-list';
import { Notebook } from 'src/@types/notebook';
import TableButton from 'src/components/table-button';
// import Link from 'src/theme/overrides/Link';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 2,
                pb: 0,
                pl: 2,
            }}
        >
            <GridToolbarQuickFilter size="small" variant={'outlined'} />
        </Box>
    );
}

type Props = {
    batchRunId?: string; // context
    simulationRunId?: string; // context
    data: Notebook[];
    onDelete: (notebook: Notebook) => void;
    onDuplicate?: (notebook: Notebook) => void | Promise<void>;
};

export default function DataGridNotebooks({ data, onDelete, onDuplicate, batchRunId, simulationRunId }: Props) {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuthContext();

    function SelectEditInputCell(rowData: GridRenderCellParams) {
        let projectName = rowData.row.simulation ? rowData.row.simulation.project.name : undefined;

        function handleOnCLick() {
            console.log('projectName', projectName);
            if (projectName) {
                push(
                    PATH_DASHBOARD.integration.view(
                        rowData.row.user.username,
                        rowData.row.simulation ? rowData.row.simulation.project.name : ('None' as string)
                    )
                );
            } else {
                enqueueSnackbar('No project configured for this test. please configure simulation.', {
                    variant: 'error',
                });
            }
        }

        return (
            // <Typography variant="subtitle2" noWrap width={'100%'}>
            <Tooltip title={projectName}>
                <Button
                    style={{
                        textTransform: 'none',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                    variant={'outlined'}
                    size="small"
                    onClick={() => handleOnCLick()}
                    // href={PATH_DASHBOARD.integration.view(
                    //   rowData.row.simulation ? rowData.row.simulation.project.name : ('None' as string)
                    // )}
                >
                    {projectName ? projectName : '*no project'}
                </Button>
            </Tooltip>
            // </Typography>
        );
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '#',
            align: 'center',
            headerAlign: 'center',
            width: 10,
            sortable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            renderCell: (index) => (
                <Typography variant="body2" color={'gray'}>
                    {index.api.getRowIndex(index.row.id) + 1}
                </Typography>
            ),
        },
        // {
        //     field: 'organization',
        //     headerName: 'Org',
        //     align: 'left',
        //     headerAlign: 'center',
        //     flex: 1,
        //     minWidth: 120,
        //     maxWidth: 220,
        //     disableColumnMenu: true,

        //     renderCell: (params) => (
        //         <TableButton
        //             tootltip={params.row.user.organization.name}
        //             // href={}
        //             text={params.row.user.organization.name}
        //         />
        //     ),
        // },
        {
            field: 'user',
            headerName: 'User',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 220,
            disableColumnMenu: true,

            renderCell: (params) => (
                <TableButton
                    tootltip={params.row.user.username}
                    // href={}
                    text={params.row.user.username}
                />
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 220,
            disableColumnMenu: true,

            renderCell: (params) => (
                <TableButton
                    tootltip={'username: "' + params.row.name + '"'}
                    href={PATH_DASHBOARD.notebook.view(params.row.id, batchRunId, simulationRunId)}
                    text={params.row.name}
                />
            ),
        },
        {
            field: 'project',
            headerName: 'Project',
            align: 'left',
            headerAlign: 'center',
            // width: 180,
            flex: 2,
            minWidth: 120,
            maxWidth: 220,
            disableColumnMenu: true,

            renderCell: (params) =>
                params.row.project && (
                    <TableButton
                        tootltip={
                            'Open Project: "' + params.row.project.user.username + '/' + params.row.project.name + '"'
                        }
                        href={PATH_DASHBOARD.integration.view(
                            params.row.project.user.username,
                            params.row.project.name
                        )}
                        text={params.row.project.user.username + '/' + params.row.project.name}
                    />
                ),
        },

        {
            field: 'description',
            headerName: 'Description',
            flex: 4,
            // minWidth: 200,
            // editable: true,
            align: 'left',
            headerAlign: 'center',
        },
        {
            field: 'updatedAt',
            type: 'dateTime',
            width: 100,
            headerName: 'updatedAt',
            align: 'center',
            headerAlign: 'center',
            sortable: true,
            // sortingOrder: ['asc'],
            renderCell: (params) => (
                <Tooltip title={fDateTimeShort(params.row.updatedAt)}>
                    <Typography variant="body2">{fDate(params.row.updatedAt)}</Typography>
                </Tooltip>
            ),
            // renderCell: (params) => fDateTimeShort(params.row.updatedAt),
        },
        {
            field: 'createdAt',
            type: 'dateTime',
            width: 100,
            headerName: 'Created',
            align: 'center',
            headerAlign: 'center',
            sortable: true,
            // sortingOrder: ['asc'],
            renderCell: (params) => (
                <Tooltip title={fDateTimeShort(params.row.createdAt)}>
                    <Typography variant="body2">{fDate(params.row.createdAt)}</Typography>
                </Tooltip>
            ),
            // renderCell: (params) => fDateTimeShort(params.row.createdAt),
        },
        {
            field: 'action',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 10,
            disableColumnMenu: true,
            sortable: false,

            renderCell: (params) => (
                <ManueItemListMenue
                    onNavigate={() => {
                        console.log('edit ', params.row.name);
                        push(PATH_DASHBOARD.notebook.view(params.row.id, batchRunId, simulationRunId));
                    }}
                    onDelete={() => {
                        onDelete(params.row);
                    }}
                    onDuplicate={
                        onDuplicate
                            ? () => {
                                  onDuplicate(params.row);
                              }
                            : undefined
                    }
                />
            ),
        },
    ];

    // const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    // useEffect(() => {
    //   const selected = data.filter((row) => selectionModel.includes(row?.id || ""));
    //   console.log('SELECTED', selected);
    // }, [selectionModel]);

    return (
        <>
            <DataGrid
                getRowHeight={() => 'auto'}
                // checkboxSelection
                disableSelectionOnClick
                rows={data}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            organization: user?.organization?.type == 'MANAGE',
                        },
                    },
                }}
                columns={columns}
                pagination
                // onSelectionModelChange={(newSelectionModel) => {
                //   setSelectionModel(newSelectionModel);
                // }}

                // disableColumnFilter
                // disableColumnSelector
                // disableDensitySelector
                components={{
                    // Toolbar: GridToolbar,
                    Toolbar: QuickSearchToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                // disableExtendRowFullWidth
                // filterModel={{
                //   items: [{ columnField: 'name', operatorValue: 'contains', value: '' }],
                // }}
            />
        </>
    );
}
