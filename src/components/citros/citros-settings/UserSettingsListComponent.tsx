// react
import { ChangeEvent, Key, useEffect, useState } from 'react';

// MUI
import { Box, Button, Stack, Typography, TextField, IconButton, Grid, Divider } from '@mui/material';

// Graphql
import getAppoloClinet from '../../../utils/connectAppolo';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_SETTINGS, UPSERT_USER_SETTINGS } from '../../../graphQL/settings';
import {
    DataGrid,
    GridCellModes,
    GridColDef,
    GridEventListener,
    GridRenderCellParams,
    GridToolbarQuickFilter,
    useGridApiContext,
    GridApi,
    GridRowParams,
} from '@mui/x-data-grid';
import TableButton from '../../table-button';
import { FormProvider, useForm } from 'react-hook-form';
import Iconify from '../../iconify';
import { RHFTextField } from '../../hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';
import UserSettingForm from './UserSettingForm';
import { useSnackbar } from '../../snackbar';

// ----------------------------------------------------------------------

export type FormValuesProps = {
    userId: string;
    organizationId: string;
    setting: object;
};

export interface FormData {
    userId: string;
    organizationId: string;
    key: string;
    value: string;
}

export interface User {
    id: string;
    organizationId: string;
    email: string;
    firstName: string;
    lastName: string;
}

type QueryProps = {
    user?: User;
};

interface UserSettingsListComponentProps extends QueryProps, FormValuesProps {}

export default function UserSettingsListComponent(
    { user }: QueryProps,
    { userId, organizationId, setting }: FormValuesProps
) {
    const [render, setRender] = useState(false);

    const { loading, error, data } = useQuery(GET_USER_SETTINGS, {
        variables: {
            organizationId: user?.organizationId,
            userId: user?.id,
        },
        skip: !user, // This will skip the query if user is undefined
    });
    if (error) {
        return <>Error</>;
    }

    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState<FormData[]>([]);
    const [editedIndex, setEditedIndex] = useState<number | null>(null); // Track the index of the form being edited

    useEffect(() => {
        try {
            // console.log("data", data)
            if (data?.getUserSettingsList) {
                // console.log("data", data)
                setFormData(data.getUserSettingsList);
            }
        } catch (error) {
            console.error(error);
        }
    }, [data]);

    const handleInputChange = (index: number, value: string): void => {
        setFormData((prevData) => {
            return prevData.map((dataItem, dataItemIndex) => {
                if (dataItemIndex === index) {
                    return { ...dataItem, value: value };
                }
                return dataItem;
            });
        });
    };

    const handleBlur = () => {
        setEditedIndex(null); // Reset the index of the form being edited when input loses focus
    };

    const handleFormSubmit = async (setting: FormData, user: any) => {
        try {
            const client = getAppoloClinet();
            let resp = await client.mutate({
                variables: {
                    key: setting.key,
                    value: setting.value,
                    organizationId: user.organizationId,
                    userId: user.id,
                },
                mutation: UPSERT_USER_SETTINGS,
            });
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            {/* <Typography variant="h6" mb={2} align="center">
                {user?.firstName} {user?.lastName}
            </Typography>
            <Divider /> */}

            <div>
                <div>
                    {formData?.map((setting, index) => (
                        <UserSettingForm
                            key={index}
                            setting={setting}
                            index={index}
                            editedIndex={editedIndex}
                            handleInputChange={handleInputChange}
                            handleBlur={handleBlur}
                            handleFormSubmit={handleFormSubmit}
                            user={user}
                        />
                    ))}
                </div>
            </div>
        </Box>
    );
}
