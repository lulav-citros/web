import { Box, Chip, LinearProgress, Link, Stack, Tooltip, Typography, Switch } from '@mui/material';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
import { User } from 'src/@types/repo';
import { UPSERT_USER } from 'src/graphQL/user';
import { fDateTimeShort } from 'src/utils/formatTime';
import { useSnackbar } from '../../../components/snackbar';
import getAppoloClinet from 'src/utils/connectAppolo';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

type Props = {
    user: User;
    onClick: (user: User) => void;
};

// type UpserUserProps = {
//     id: string;
//     isActive: string;
//     organizationId: string;
//     email: string;
// };

export function UserListRow({ user, onClick }: Props) {
    const currentUser = useAuthContext().user;
    const { enqueueSnackbar } = useSnackbar();
    const [upsertUser] = useMutation(UPSERT_USER);
    const [isActive, setIsActive] = useState<boolean>(!!user.isActive); // Use a local state variable to manage the switch state

    const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();

        const newIsActive = event.target.checked;
        setIsActive(newIsActive); // Update the state based on the new switch value

        console.log();

        try {
            const response = await upsertUser({
                variables: {
                    id: user?.id,
                    user: {
                        user: {
                            id: user?.id,
                            isActive: newIsActive,
                            organizationId: user?.organizationId,
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            email: user?.email,
                        },
                    },
                },
            });
            enqueueSnackbar('Update success!', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: 'error' });
            setIsActive((prevState) => !prevState); // Revert the state if the mutation fails
        }
    };

    return (
        <Box
            display={'flex'}
            alignItems={'center'} // align items in a straight line
            justifyContent={'space-between'}
            gap={1}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                ':hover': {
                    cursor: 'pointer',
                    backgroundColor: 'grey.850',
                },
            }}
            onClick={() => {
                onClick(user);
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '15%' }}>
                {user.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '15%' }}>
                {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '20%' }}>
                {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '15%' }}>
                {user.role.role}
            </Typography>
            <Switch
                checked={isActive}
                onChange={handleSwitchChange}
                onClick={(event) => event.stopPropagation()}
                disabled={currentUser.role !== 'admin'}
            />
            <Chip
                label={isActive ? 'Active' : 'Inactive'}
                color={isActive ? 'success' : 'error'}
                variant="outlined"
                size="small"
                sx={{ minWidth: '10%' }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '15%' }}>
                {fDateTimeShort(user?.createdAt || '')}
            </Typography>
        </Box>
    );
}
