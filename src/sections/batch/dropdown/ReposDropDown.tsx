import { useSnackbar } from 'notistack';
// @mui
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Box, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import { RHFSelect } from '../../../components/hook-form';

import { gql, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { Repo } from 'src/@types/repo';
// ----------------------------------------------------------------------

type Props = {
    defaultRepoName?: string; // default
    onChange: (repo: Repo) => void;
};

export default function ReposDropDown({ defaultRepoName, onChange }: Props) {    
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, data } = useQuery<{
        reposList: Repo[];
    }>(gql`
        query repos {
            reposList {
                id
                name
                user {
                    email
                }
            }
        }
    `);

    const repoList: Repo[] = useMemo(() => {
        return data?.reposList || [];
    }, [data]);

    const defaultRepo: Repo | undefined = useMemo(() => {
        return repoList.find((element) => {
            return element.name.includes(defaultRepoName as string);
        });
    }, [data]);

    useMemo(() => {
        if (defaultRepo) {
            onChange(defaultRepo);
        }
    }, [defaultRepo]);

    if (error) {
        console.error('ERROR!', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        return <></>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // const repoList = data?.reposList || [];
    // const defaultRepo = repoList.find((element) => {
    //     return element.name.includes(defaultRepoName as string);
    // });

    return (
        <Autocomplete
            disableClearable
            fullWidth
            value={defaultRepo}
            defaultValue={defaultRepo}
            onChange={(event, newValue: Repo) => {
                // const repo = repoList.find((repo) => {
                //     return repo.name == newValue.name;
                // });
                onChange(newValue);
            }}
            options={repoList}
            getOptionLabel={(repo) => repo.user?.email + '/' + repo.name}
            renderInput={(params) => <TextField {...params} label="Repository" margin="none" />}
        />
    );
}
