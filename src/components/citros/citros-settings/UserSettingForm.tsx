import { ChangeEvent, Key } from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { FormValuesProps, FormData } from './UserSettingsListComponent';
import Iconify from '../../iconify';
import { useAuthContext } from 'src/auth/useAuthContext';

interface FormProps {
    setting: FormData;
    index: number;
    editedIndex: number | null;
    handleInputChange: (index: number, value: string) => void;
    handleBlur: () => void;
    handleFormSubmit: (setting: FormData, user: any) => Promise<void>;
    user: any;
}

export default function UserSettingForm(props: FormProps) {
    const { setting, index, editedIndex, handleInputChange, handleBlur, handleFormSubmit, user } = props;

    const currentUser = useAuthContext().user;

    return (
        <div key={index}>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={5} md={5} mt={1}>
                    <Typography>{setting.key}</Typography>
                </Grid>
                <Grid item xs={5} md={5}>
                    <TextField
                        disabled={currentUser.role !== 'admin'}
                        type="text"
                        size="small"
                        value={setting.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <IconButton
                        disabled={currentUser.role !== 'admin'}
                        onClick={() => handleFormSubmit(setting, user)}
                        color={editedIndex === index ? 'primary' : 'default'}
                    >
                        <Iconify icon="ic:baseline-cloud-upload" />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}
