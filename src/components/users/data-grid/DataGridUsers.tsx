import { useAuthContext } from '../../../auth/useAuthContext';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { fDate, fDateTimeShort } from '../../../utils/formatTime';
import { IUserListInfo } from 'src/@types/user';
import TableButton from 'src/components/table-button';
import DraggableDrawer from 'src/components/drawer/DraggableDrawer';
import { useState } from 'react';
import UserSettingsListComponent from 'src/components/citros/citros-settings/UserSettingsListComponent';
import { User } from 'src/components/citros/citros-settings/UserSettingsListComponent';
import Iconify from 'src/components/iconify';

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
    data: IUserListInfo[];
};

export default function DataGridUsers({ data }: Props) {
    const { user } = useAuthContext();

    const [userSettingsOpen, setUserSettingsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    const handleIserSettingsToggle = () => {
        setUserSettingsOpen(!userSettingsOpen);
    };

    const handleserSettingsClose = () => {
        setUserSettingsOpen(false);
    };

    const handleRowClick: GridEventListener<'rowClick'> = (params, event, details) => {
        setSelectedUser(params.row as User);
        setUserSettingsOpen((prevState) => !prevState);
    };

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
        {
            field: 'username',
            headerName: 'Username',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 220,
            disableColumnMenu: true,

            renderCell: (params) => <TableButton tootltip={params.row.username} text={params.row.username} />,
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
                    tootltip={params.row.firstName + ' ' + params.row.lastName}
                    text={params.row.firstName + ' ' + params.row.lastName}
                />
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 320,
            disableColumnMenu: true,

            renderCell: (params) => <TableButton tootltip={params.row.email} text={params.row.email} />,
        },
        {
            field: 'isActive',
            type: 'boolean',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 320,
            disableColumnMenu: true,

            renderCell: (params) => (
                <TableButton tootltip={params.row.isActive} text={params.row.isActive ? 'Active' : 'Not Active'} />
            ),
        },
        {
            field: 'role',
            headerName: 'Role',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
            maxWidth: 320,
            disableColumnMenu: true,

            renderCell: (params) => <TableButton tootltip={params.row.role.role} text={params.row.role.role} />,
        },
        {
            field: 'createdAt',
            type: 'dateTime',
            width: 100,
            headerName: 'Created',
            align: 'center',
            headerAlign: 'center',
            sortable: true,
            renderCell: (params) => (
                <Tooltip title={fDateTimeShort(params.row.createdAt)}>
                    <Typography variant="body2">{fDate(params.row.createdAt)}</Typography>
                </Tooltip>
            ),
        },
        {
            field: 'updatedAt',
            type: 'dateTime',
            width: 100,
            headerName: 'Updated',
            align: 'center',
            headerAlign: 'center',
            sortable: true,
            renderCell: (params) => (
                <Tooltip title={fDateTimeShort(params.row.updatedAt)}>
                    <Typography variant="body2">{fDate(params.row.updatedAt)}</Typography>
                </Tooltip>
            ),
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
                <IconButton aria-label="more" aria-controls="long-menu">
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            ),
        },
    ];

    return (
        <>
            <DataGrid
                getRowHeight={() => 'auto'}
                disableSelectionOnClick
                onRowClick={handleRowClick}
                rows={data}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            organization: user?.role?.id == '1',
                        },
                    },
                }}
                columns={columns}
                pagination
                components={{
                    Toolbar: QuickSearchToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
            <DraggableDrawer
                // MainChildren={UserSettingsListComponent}
                // mainChildrenProps={{ user: selectedUser }}
                NavChildren={<Typography>User settings for: {selectedUser?.email || ''}</Typography>}
                open={userSettingsOpen}
                setOpen={handleIserSettingsToggle}
                defaultDrawerWidth={600}
                minDrawerWidth={500}
                maxDrawerWidth={1500}
            >
                <UserSettingsListComponent user={selectedUser} />
            </DraggableDrawer>
        </>
    );
}
