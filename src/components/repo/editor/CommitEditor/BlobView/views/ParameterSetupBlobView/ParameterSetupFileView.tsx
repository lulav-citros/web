import { useCommitEditorContext } from '../../../CommitEditorContext';
import { CodeEditor } from '../../../../../../monaco';
import { toFileDataStringValue } from '../../../file.utils';
import { findFileInFolder } from '../../../file.utils';
import { Box, Typography, TextField, Stack, Divider, Autocomplete } from '@mui/material';
import { getGitFileApi, getGitTreeApi, IGetFileRequest } from 'src/components/repo/gitolite.api';
import { FC, Key, useEffect, useMemo, useState } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { CommitEditorState } from '../../../types';
import {
    collectPyFiles,
    parsePythonFunctions,
    getDefaultParamValue,
    flattenParameterSetup,
    reconstructParameterSetup,
} from './fileViewUtilities/util';
import { preprocessJsonString } from './fileViewUtilities/jsonParseWithTypes';
import { reversePreprocessJsonString } from './fileViewUtilities/jsonStringifyWithTypes';
import {
    ParamValueTextField,
    ArrayInput,
    NumpyFunctionInput,
    FunctionInput,
    ParamNameDisplay,
} from './fileViewUtilities/ValueDisplay';
import { PARAMETER_TYPES } from './fileViewUtilities/consts';
import { ParameterSetupFileViewProps, FunctionList, ParameterSetupRaw } from './fileViewUtilities/types';

export const ParameterSetupFileView: FC<ParameterSetupFileViewProps> = ({
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

    const defaultParsedData: ParameterSetupRaw = {
        packages: {},
    };

    const [parsedData, setParsedData] = useState<ParameterSetupRaw>(defaultParsedData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (value && typeof value === 'string') {
            try {
                const processedJSON = preprocessJsonString(value);
                const parsedObj = JSON.parse(processedJSON);
                setParsedData(parsedObj);
            } catch (e) {
                console.error('Error parsing data:', value, e);
                setError('Invalid JSON');
            }
        }
    }, [value]);

    const [editedData, setEditedData] = useState(parsedData);

    const [functionList, setFunctionList] = useState<FunctionList>([]);
    const [fileList, setFileList] = useState<string[]>([]);

    useEffect(() => {
        const fetchFileData = async (fileList: string[]) => {
            const resultList: FunctionList = [];

            for (const fileName of fileList) {
                try {
                    const response = await getGitFileApi({
                        filePath: `/parameter_setups/functions/${fileName}`,
                        repoName: repoName,
                        branch: branch,
                        type: 'blob',
                        organizationSlug: organizationSlug,
                    });

                    const functions = parsePythonFunctions(response);

                    resultList.push({
                        fileName: fileName,
                        functions: functions,
                    });
                } catch (error) {
                    console.error('Error fetching file data:', error);
                    setError('Invalid JSON');
                }
            }

            setFunctionList(resultList);
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
                const functions = collectPyFiles(response.parameter_setups);
                setFileList(functions);
                fetchFileData(functions);
            } catch (error) {
                console.error('Error fetching repo tree:', error);
            }
        };

        fetchRepoTree();
    }, []);

    const [flattenedData, setFlattenedData] = useState(flattenParameterSetup(parsedData));

    useEffect(() => {
        setEditedData(parsedData);
        setFlattenedData(flattenParameterSetup(parsedData));
    }, [parsedData]);

    const handleParamTypeChange = (id: string, newType: string) => {
        setFlattenedData((prevFlattenedData) => {
            const updatedFlattenedData = prevFlattenedData.map((row) => {
                if (row.id === id) {
                    if (newType === 'function') {
                        return {
                            ...row,
                            paramType: newType,
                            paramValue: getDefaultParamValue(
                                newType,
                                functionList[0] ? functionList[0].fileName : 'default:function'
                            ),
                        };
                    }
                    return {
                        ...row,
                        paramType: newType,
                        paramValue: getDefaultParamValue(newType),
                    };
                }
                return row;
            });

            const updatedData = reconstructParameterSetup(updatedFlattenedData);
            setEditedData(updatedData);

            return updatedFlattenedData;
        });
    };

    const handleParamValueChange = (id: string, newValue: any) => {
        setFlattenedData((prevFlattenedData) => {
            const updatedFlattenedData = prevFlattenedData.map((row) => {
                if (row.id === id) {
                    return {
                        ...row,
                        paramValue: newValue,
                    };
                }
                return row;
            });
            const updatedData = reconstructParameterSetup(updatedFlattenedData);
            setEditedData(updatedData);

            return updatedFlattenedData;
        });
    };

    useEffect(() => {
        if (!value) {
            return;
        }
        if (editedData !== parsedData) {
            let dataToSend = reversePreprocessJsonString(JSON.stringify(editedData, null, 4));
            onChange(dataToSend);
        }
    }, [editedData]);

    if (!value) {
        return <LoadingScreen />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box
            sx={{
                // py: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                // sx={{ py: 1 }}
                sx={{ py: 1, backgroundColor: 'grey.850' }}
            >
                <Typography variant="body2" color={'gray'} sx={{ pl: 1 }}>
                    #
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    Package Name
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    Node Name
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    Parameter name
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    Parameter Type
                </Typography>
                <Typography variant="body2" sx={{ flex: 2, mr: 2 }}>
                    Parameter Value
                </Typography>
            </Stack>

            <Stack sx={{ py: 2 }} spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
                {flattenedData.map((row, rowIndex) => (
                    <Stack
                        key={row.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Typography variant="body2" color={'gray'} sx={{ pl: 1 }}>
                            {rowIndex + 1}
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            {row.packageName}
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            {row.nodeName}
                        </Typography>
                        <Box sx={{ flex: 1 }}>
                            <ParamNameDisplay paramName={row.paramName} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                disableClearable
                                value={row.paramType}
                                size="small"
                                options={PARAMETER_TYPES}
                                renderInput={(params) => <TextField {...params} />}
                                onChange={(event, newValue) => {
                                    handleParamTypeChange(row.id, newValue);
                                }}
                                disabled={readOnly}
                            />
                        </Box>
                        <Box sx={{ flex: 2, mr: 2, px: 1 }}>
                            {['int', 'float', 'string'].includes(row.paramType) ? (
                                <ParamValueTextField
                                    paramType={row.paramType}
                                    paramValue={row.paramValue}
                                    handleValueChange={handleParamValueChange}
                                    rowId={row.id}
                                    readOnly={readOnly}
                                />
                            ) : row.paramType === 'array_string' ||
                              row.paramType === 'array_int' ||
                              row.paramType === 'array_float' ? (
                                <ArrayInput
                                    value={row.paramValue}
                                    onChange={handleParamValueChange}
                                    id={row.id}
                                    arrayType={row.paramType}
                                    readOnly={readOnly as boolean}
                                />
                            ) : row.paramType === 'numpy_function' ? (
                                <NumpyFunctionInput
                                    value={row.paramValue}
                                    onChange={(newValue) => handleParamValueChange(row.id, newValue)}
                                    id={row.id}
                                    readOnly={readOnly as boolean}
                                />
                            ) : row.paramType === 'function' ? (
                                <FunctionInput
                                    value={row.paramValue}
                                    functionList={functionList}
                                    onChange={(newValue) => handleParamValueChange(row.id, newValue)}
                                    id={row.id}
                                    readOnly={readOnly as boolean}
                                />
                            ) : (
                                String(row.paramValue)
                            )}
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};
