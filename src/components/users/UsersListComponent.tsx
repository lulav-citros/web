import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION_USERS } from '../../graphQL/user';
import { useAuthContext } from '../../auth/useAuthContext';
import DraggableDrawer from '../drawer/DraggableDrawer';
import { UserListRow } from './userList/UserListRow';
import { UserListToolbar } from './userList/UserListToolbar';
import { User } from 'src/@types/repo';
import UserSettingsListComponent from '../citros/citros-settings/UserSettingsListComponent';

function filterData(list: User[], filter: string): User[] {
    return list.filter((repo) => repo.email.toLowerCase().includes(filter.toLowerCase()));
}

type Props = {};

export default function UsersListComponent({}: Props) {
    const { user } = useAuthContext();

    // Get the data from CiTROS GraphQL API
    const { loading, error, data } = useQuery(GET_ORGANIZATION_USERS, {
        variables: { organizationId: user.organization.id },
    });
    const tableData = useMemo(() => {
        // console.log("data", data)
        return data?.usersList || [];
    }, [data]);

    const [filter, setFileter] = useState('');

    const [userSettingsOpen, setUserSettingsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    const handleIserSettingsToggle = () => {
        setUserSettingsOpen(!userSettingsOpen);
    };

    const handleserSettingsClose = () => {
        setUserSettingsOpen(false);
    };

    return (
        <>
            <UserListToolbar onChange={(data) => setFileter(data as string)} />

            <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1, width: '100%' }}>
                {tableData &&
                    filterData(tableData, filter).map((u) => (
                        <UserListRow
                            user={u}
                            key={u.id}
                            onClick={(user) => {
                                setSelectedUser(user);
                                setUserSettingsOpen((prevState) => !prevState);
                            }}
                        />
                    ))}
            </Box>

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

            {/* <Card sx={{ height: '75vh', width: '100%', position: 'relative' }}>
                <DataGridUsers data={tableData} />
            </Card> */}
        </>
    );
}
