import { useSnackbar } from 'notistack';
import { useEffect, useState, use, useMemo } from 'react';
import { Autocomplete, Box, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import axios from 'src/utils/axios';
import { useGitRepository } from 'src/components/repo/editor/CommitEditor';
import LoaderOverWidget from 'src/components/loaderOverWidget/LoaderOverWidget';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Simulation } from 'src/@types/test';
import { findFilesInFolder } from 'src/components/repo/editor/CommitEditor/file.utils';
import { GitItem } from 'src/components/repo/gitolite.types';
import { DEFAULT_BRANCH } from 'src/config';

type Props = {
    repoName: string;
    branch: string;

    onChange: (simulation: string) => void;
};

export default function SimulationsDropDown({ repoName, branch = DEFAULT_BRANCH, onChange }: Props) {
    const { user } = useAuthContext();

    const { loading, load, gitRepository } = useGitRepository();

    const [defaultSimulation, setDefaultSimulation] = useState<GitItem | undefined>();

    useEffect(() => {
        // console.log('load tree!!!', user.organization.slug, repoName, branch);
        load({ organizationSlug: user.organization.slug as string, repoName: repoName, branch: branch });
    }, [user, repoName, branch]);

    const simulationList = useMemo(() => {
        if (loading) return [];
        // console.log('loading, load, gitRepository', loading, load, gitRepository);

        if (!gitRepository) return [];

        const items = findFilesInFolder(gitRepository, ['simulations']);

        if (items.length === 0) return [];

        const filtered_items = items.filter((item) => {
            return item.name.endsWith(".json")
        });

        setDefaultSimulation(filtered_items[0]);
        // console.log("items", items)

        return filtered_items;
    }, [gitRepository]);

    if (loading) {
        // return <LoaderOverWidget />;
        return <div>Loading...</div>;
    }


    return (
        <Autocomplete
            disableClearable
            fullWidth
            // defaultValue={defaultSimulation}
            onChange={(event, newValue: any) => {
                // console.log("vova-----", event, newValue);
                onChange(newValue.name);
            }}
            options={simulationList}
            getOptionLabel={(simulation) => simulation.name}
            renderInput={(params) => <TextField {...params} label="Simulation" margin="none" />}
        />
    );
}
