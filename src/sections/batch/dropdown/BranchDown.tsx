import { useSnackbar } from 'notistack';
import { useEffect, useState, use, useMemo } from 'react';
import { Autocomplete, Box, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import axios from 'src/utils/axios';
import { useGitRepository } from 'src/components/repo/editor/CommitEditor';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Simulation } from 'src/@types/test';
import { findFilesInFolder } from 'src/components/repo/editor/CommitEditor/file.utils';
import { getBranches } from 'src/components/repo/gitolite.api';
import { DEFAULT_BRANCH } from 'src/config';

type Props = {
    repoName: string;
    branch: string;

    onChange: (branch: string) => void;
};



export default function BranchDown({ repoName, branch = DEFAULT_BRANCH, onChange }: Props) {
    const { user } = useAuthContext();

    const [branchList, setBranchList] = useState<string[]>([DEFAULT_BRANCH]);

    useEffect(() => {
        async function load() {
            setBranchList([]); // this is optional
            const resp = await getBranches({
                organizationSlug: user.organization.slug as string,
                repoName: repoName,
                branch: branch,
            });
            // console.log("BranchDown", resp);
            setBranchList(resp); // this is optional
        }

        load();
    }, [repoName, branch]);

    return (
        <Autocomplete
            disableClearable
            fullWidth
            defaultValue={DEFAULT_BRANCH}
            onChange={(event, newValue: any) => {
                // console.log("vova-----", event, newValue);
                onChange(newValue);
            }}
            options={branchList}
            getOptionLabel={(branch) => branch}
            renderInput={(params) => <TextField {...params} label="Branches" margin="none" />}
        />
    );
}
