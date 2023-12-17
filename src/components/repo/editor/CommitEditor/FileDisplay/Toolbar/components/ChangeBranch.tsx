import React, { useEffect, useMemo, useState } from 'react';
import { useCommitEditorContext } from '../../../CommitEditorContext';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { PATH_REPO } from 'src/routes/paths';
import { getBranches } from 'src/components/repo/gitolite.api';
import { useSnackbar } from 'src/components/snackbar';

export function ChangeBranch() {
    const { isFolder, fileRoute, context } = useCommitEditorContext();
    const route = useRouter();

    // console.log(route.query);
    const { enqueueSnackbar } = useSnackbar();

    const routingBranch = useMemo(() => {
        return route.query && route.query.branch ? (route.query.branch as string) : 'main';
    }, [route]);
    const [branchList, setBranchList] = useState<string[]>([]);
    const [defaultBranch, setDefaultBranch] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            // setBranchList([]); // this is optional
            const resp = await getBranches({
                organizationSlug: context.organizationSlug,
                repoName: fileRoute.repoName,
                branch: fileRoute.branch,
            });

            // console.log("BranchDown", resp);
            setBranchList(resp); // this is optional
            setLoaded(true);
        };

        load();
    }, [context, fileRoute]);

    useEffect(() => {
        // we have no branch in routing
        // searching for main branch in repo.
        if (!loaded) {
            return;
        }

        // console.log('branchList.indexOf(routingBranch)', branchList.indexOf(routingBranch), branchList, loaded);
        if (branchList.indexOf(routingBranch) > -1) {
            setDefaultBranch(routingBranch);
        } else {
            enqueueSnackbar('No default "' + routingBranch + '" branch detected, please pick other branch', {
                variant: 'warning',
                autoHideDuration: 3000,
            });
        }
    }, [branchList, routingBranch]);

    return (
        <>
            <Autocomplete
                sx={{ color: 'red' }}
                fullWidth
                disableClearable
                size="small"
                onChange={(event, newValue: any) => {
                    // console.log('vova-----', event, newValue);
                    const url = isFolder
                        ? PATH_REPO.tree(fileRoute.repoName, newValue, fileRoute.filePath.join('/'))
                        : PATH_REPO.blob(fileRoute.repoName, newValue, fileRoute.filePath.join('/'));

                    route.push(url, undefined, { shallow: true });
                    // route.reload();
                }}
                options={branchList}
                getOptionLabel={(branch) => branch}
                value={defaultBranch}
                renderInput={(params) => <TextField {...params} label="branch" margin="none" />}
            />
        </>
    );
}
