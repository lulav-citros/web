import { useCommitEditorContext } from '../../../CommitEditorContext';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { getGitFileApi, getGitTreeApi } from 'src/components/repo/gitolite.api';
import { DEFAULT_PROJECT_JSON } from '../../../consts';
import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

interface ProjectJsonType {
    packages: {
        name: string;
        launches: { name: string }[];
    }[];
}

interface SimulationFilePreviewerProps {
    value?: string;
    initialValue?: string;
    onChange: (value: string) => void;
    onClick?: (e: MouseEvent) => void;
    onBlur?: () => void;
    readOnly?: boolean;
}

interface PackageLaunch {
    packageName: string;
    launches: { name: string }[];
}

interface ParamSetup {
    type: string;
    name: string;
    path: string;
}

const handleNumericKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Backspace', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key)) {
        return;
    } else if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
};

const handleNumericPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = (e.clipboardData ?? window.Clipboard).getData('text');
    if (!/^\d+$/.test(pastedText)) {
        e.preventDefault();
    }
};

export const SimulationFilePreviewer: FC<SimulationFilePreviewerProps> = ({
    value,
    initialValue,
    onChange,
    onClick,
    onBlur,
    readOnly,
}) => {
    const {
        fileRoute: { filePath, repoName, branch },
        state: { fileData, isEditing },
        actions: { loadFile },
        context: { organizationSlug },
        isFolder,
        gitRepository,
    } = useCommitEditorContext();

    const router = useRouter();
    const { query, asPath } = router;

    const parsedData = useMemo(() => {
        try {
            return JSON.parse(value as string);
        } catch (e) {
            return [];
        }
    }, [value]);

    const [formData, setFormData] = useState(() => parsedData);
    const [parsedLaunch, setParsedLaunch] = useState<PackageLaunch[]>([]);
    const [paramSetups, setParamSetups] = useState<ParamSetup[]>([]);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await getGitFileApi({
                    filePath: `${DEFAULT_PROJECT_JSON}`,
                    repoName: repoName,
                    branch: branch,
                    type: 'blob',
                    organizationSlug: organizationSlug,
                });

                if (response) {
                    if (response == undefined) return <LoadingScreen />;
                    const projectJson: ProjectJsonType = JSON.parse(response);
                    const launches: PackageLaunch[] = projectJson.packages.map((pkg) => ({
                        packageName: pkg.name,
                        launches: pkg.launches,
                    }));
                    setParsedLaunch(launches);
                }
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };
        const fetchRepoTree = async () => {
            try {
                const response = await getGitTreeApi({
                    filePath: `/`,
                    repoName: repoName,
                    branch: branch,
                    type: 'tree',
                    organizationSlug: organizationSlug,
                });

                if ('children' in response.parameter_setups) {
                    const filteredParamSetups: { [key: string]: any } = {};
                    for (const key in response.parameter_setups.children) {
                        if (key !== 'README.md' && response.parameter_setups.children[key].type !== 'tree') {
                            filteredParamSetups[key] = response.parameter_setups.children[key];
                        }
                    }

                    setParamSetups(Object.values(filteredParamSetups));
                }
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };
        fetchFileData();
        fetchRepoTree();
    }, []);

    const [selectedPackage, setSelectedPackage] = useState<string | null>(parsedData?.launch?.package || null);
    const [selectedLaunch, setSelectedLaunch] = useState<string | null>(parsedData?.launch?.file || null);
    const [selectedParamSetup, setSelectedParamSetup] = useState<string | null>(parsedData?.parameter_setup || null);

    const handleInputChange = (field: string, newValue: any) => {
        let updatedData;
        const convertedValue =
            ['timeout', 'GPU', 'CPU', 'MEM'].includes(field) && newValue !== '' ? Number(newValue) : newValue;

        if (field.includes('.')) {
            const [parentField, childField] = field.split('.');
            updatedData = {
                ...formData,
                [parentField]: {
                    ...formData[parentField],
                    [childField]: convertedValue,
                },
            };
        } else {
            updatedData = {
                ...formData,
                [field]: convertedValue,
            };
        }

        setFormData(updatedData);
        onChange(JSON.stringify(updatedData, null, 4));
    };

    return (
        <Box sx={{ my: 2, mx: 5 }}>
            <Typography sx={{ mb: 2 }}>Description:</Typography>
            <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={2}
                sx={{ width: '80%', mb: 2 }}
                disabled={readOnly}
            />
            <Typography sx={{ mb: 2 }}>Parameter setup:</Typography>

            <Autocomplete
                value={selectedParamSetup}
                onChange={(event, newValue) => {
                    setSelectedPackage(newValue);
                    handleInputChange('parameter_setup', newValue); // update the formData state
                }}
                options={paramSetups.map((pSetup) => pSetup.name)}
                renderInput={(params) => <TextField {...params} label="Parameter Setup" variant="outlined" />}
                sx={{ width: '80%', mb: 2 }}
                disabled={readOnly}
            />

            <Typography sx={{ mb: 2 }}>Launch setup:</Typography>
            <Autocomplete
                value={selectedPackage}
                onChange={(event, newValue) => {
                    setSelectedPackage(newValue);
                    handleInputChange('launch.package', newValue); // update the formData state
                }}
                options={parsedLaunch.map((pkg) => pkg.packageName)}
                renderInput={(params) => <TextField {...params} label="Package" variant="outlined" />}
                sx={{ width: '80%', mb: 2 }}
                disabled={readOnly}
            />

            <Autocomplete
                value={selectedLaunch}
                onChange={(event, newValue) => {
                    setSelectedLaunch(newValue);
                    handleInputChange('launch.file', newValue); // update the formData state
                }}
                options={
                    parsedLaunch
                        .find((pkg) => pkg.packageName === selectedPackage)
                        ?.launches.map((launch) => launch.name) || []
                }
                renderInput={(params) => <TextField {...params} label="Launch File" variant="outlined" />}
                sx={{ width: '80%', mb: 2 }}
                disabled={readOnly}
            />
            <Typography sx={{ mb: 2 }}>Resource Configuration:</Typography>
            <TextField
                label="Timeout [sec]"
                value={formData.timeout}
                onChange={(e) => handleInputChange('timeout', e.target.value)}
                sx={{ width: '80%', mb: 2 }}
                type="number"
                onKeyDown={handleNumericKeyPress}
                onPaste={handleNumericPaste}
                disabled={readOnly}
            />
            <TextField
                label="GPU [cores]"
                value={formData.GPU}
                onChange={(e) => handleInputChange('GPU', e.target.value)}
                sx={{ width: '80%', mb: 2 }}
                type="number"
                onKeyDown={handleNumericKeyPress}
                onPaste={handleNumericPaste}
                disabled={readOnly}
            />
            <TextField
                label="CPU [cores]"
                value={formData.CPU}
                onChange={(e) => handleInputChange('CPU', e.target.value)}
                sx={{ width: '80%', mb: 2 }}
                type="number"
                onKeyDown={handleNumericKeyPress}
                onPaste={handleNumericPaste}
                disabled={readOnly}
            />
            <TextField
                label="MEM [MB]"
                value={formData.MEM}
                onChange={(e) => handleInputChange('MEM', e.target.value)}
                sx={{ width: '80%', mb: 2 }}
                type="number"
                onKeyDown={handleNumericKeyPress}
                onPaste={handleNumericPaste}
                disabled={readOnly}
            />
            <Typography sx={{ mb: 2 }}>Storage Type:</Typography>
            <TextField
                label="Storage Type"
                value={formData.storage_type}
                onChange={(e) => handleInputChange('storage_type', e.target.value)}
                sx={{ width: '80%', mb: 2 }}
                disabled={readOnly}
            />
        </Box>
    );
};
