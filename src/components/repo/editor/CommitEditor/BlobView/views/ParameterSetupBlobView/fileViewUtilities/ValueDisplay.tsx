import {
    Autocomplete,
    Box,
    TextField,
    Stack,
    List,
    ListItem,
    Typography,
    IconButton,
    Popover,
    Link,
} from '@mui/material';
import { FC, Key } from 'react';
import {
    NumpyFunctionInputProps,
    FunctionInputProps,
    ParamValueTextFieldProps,
    ValidTypes,
    ParamNameProps,
    NumpyFunctionObj,
} from './types';
import React, { useState, useEffect } from 'react';
import { arrayReplacer, stringArrayNumericParse } from './util';
import { isValidArrayString, isValidMixedArrayString, isOfType } from './checkers';
import { numpyRandomFunctionsUPD } from './consts';
import Iconify from '../../../../../../../iconify';

export const ParamValueTextField: React.FC<ParamValueTextFieldProps> = ({
    paramType,
    paramValue,
    handleValueChange,
    rowId,
    readOnly,
}) => {
    const [localValue, setLocalValue] = useState<string>(paramValue);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLocalValue(paramValue);
    }, [paramValue]);

    const validateValue = (value: string): boolean => {
        if (paramType !== 'string' && !isOfType(value, paramType as ValidTypes)) {
            setError(`Invalid ${paramType} value`);
            return false;
        }
        setError(null);
        return true;
    };

    const handleBlur = () => {
        if (localValue === '') {
            setError(`Empty value`);
            return false;
        }
        if (validateValue(localValue)) {
            handleValueChange(rowId, localValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        setError(null);
    };

    return (
        <TextField
            disabled={readOnly}
            value={localValue}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            size="small"
            fullWidth
            sx={{ width: '50%' }}
            error={!!error}
            helperText={error}
        />
    );
};

export const ArrayInput: React.FC<{
    value: any;
    onChange: (id: string, newValue: any) => void;
    id: string;
    arrayType: string;
    readOnly: boolean;
}> = ({ value, onChange, id, arrayType, readOnly }) => {
    const [localValue, setLocalValue] = useState<string>(arrayReplacer(value));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLocalValue(arrayReplacer(value));
    }, [value]);

    const convertAndValidate = (value: string) => {
        switch (arrayType) {
            case 'array_int':
                const intValue = parseInt(value, 10);
                if (value === intValue.toString()) return intValue;
                break;
            case 'array_float':
                if (/^-?\d+\.\d*$/.test(value)) return value;
                break;
            case 'array_string' || 'array_args':
                return value;
            default:
                break;
        }
        throw new Error('Type mismatch');
    };

    const handleBlur = () => {
        try {
            const convertAndValidateArray = (array: any[]): any[] => {
                return array.map((item) => {
                    if (Array.isArray(item)) return convertAndValidateArray(item);
                    return convertAndValidate(item as string);
                });
            };

            let parsed;

            if (arrayType === 'array_string') {
                if (isValidArrayString(localValue)) {
                    parsed = localValue;
                } else throw new Error('Not an array');
            } else {
                parsed = stringArrayNumericParse(localValue.replace(/([-]?\d+\.\d+|[-]?\d+|\w+|[#!$%^&*]+)/g, '"$1"'));
                parsed = convertAndValidateArray(parsed);
                if (!Array.isArray(parsed)) throw new Error('Not an array');
            }

            onChange(id, parsed);
            setError(null);
        } catch (err) {
            if (err.message === 'Type mismatch') {
                setError('Invalid array type. Please provide a valid array.');
            } else {
                setError('Invalid format. Please enter a valid array.');
            }
        }
    };

    return (
        <Box>
            <TextField
                disabled={readOnly}
                value={localValue}
                onChange={(e) => {
                    setLocalValue(e.target.value);
                    setError(null);
                }}
                onBlur={handleBlur}
                size="small"
                fullWidth
                multiline
                minRows={1}
                maxRows={6}
                variant="outlined"
                sx={{ width: '50%' }}
                error={Boolean(error)}
                helperText={error}
            />
        </Box>
    );
};

export const NumpyFunctionInput: FC<NumpyFunctionInputProps> = ({ value, onChange, id, readOnly }) => {
    const [localValue, setLocalValue] = useState<string>(arrayReplacer(value.args || []));
    const [error, setError] = useState<string | null>(null);
    const numpyFunctionNames = numpyRandomFunctionsUPD.map((func) => func.name);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const handleFunctionChange = (newValue: string) => {
        onChange({
            ...value,
            function: newValue,
        });
    };

    const handleArgBlur = () => {
        try {
            let parsed;
            if (isValidMixedArrayString(localValue)) {
                parsed = localValue;
            } else throw new Error('Not an array');
            onChange({ ...value, args: parsed });
            setError(null);
        } catch (err) {
            setError('Invalid format. Please enter valid array.');
        }
    };

    console.log(numpyRandomFunctionsUPD.find((func) => func.name === value.function)?.description);

    return (
        <Box>
            <Autocomplete
                disableClearable
                disabled={readOnly}
                value={value.function}
                options={numpyFunctionNames}
                renderInput={(params) => <TextField {...params} label="Function" />}
                onChange={(event, newValue) => handleFunctionChange(newValue)}
                sx={{ mb: 1 }}
                size="small"
            />
            <Stack direction="row" justifyContent={'space-between'} alignItems="flex-start" spacing={2}>
                <TextField
                    disabled={readOnly}
                    value={localValue}
                    onChange={(e) => {
                        setLocalValue(e.target.value);
                        setError(null);
                    }}
                    onBlur={handleArgBlur}
                    size="small"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={6}
                    variant="outlined"
                    sx={{ width: '50%' }}
                    error={Boolean(error)}
                    helperText={error}
                />
                <IconButton onClick={handlePopoverOpen} color="warning">
                    <Iconify icon="grommet-icons:status-info" />
                </IconButton>
            </Stack>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: { maxWidth: '500px', maxHeight: '300px', overflow: 'auto' },
                }}
            >
                <Box sx={{ padding: 2 }}>
                    {value.function &&
                        numpyRandomFunctionsUPD
                            .find((func) => func.name === value.function)
                            ?.description.split(/ {2,}/) // Split by two or more spaces
                            .map((line, index) => (
                                <Typography key={index} variant="body2" gutterBottom>
                                    {formatLine(line.trim(), index === 0)} {/* Pass true for the first line */}
                                </Typography>
                            ))}
                </Box>
                {value.function && (
                    <Link
                        href={
                            numpyRandomFunctionsUPD.find((func: NumpyFunctionObj) => func.name === value.function)?.link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ padding: 2 }}
                    >
                        Numpy Documentation
                    </Link>
                )}
            </Popover>
        </Box>
    );
};

export const FunctionInput: React.FC<FunctionInputProps> = ({ value, functionList, onChange, id, readOnly }) => {
    const [selectedFile, setSelectedFile] = useState<string | null | undefined>('');
    const [selectedFunction, setSelectedFunction] = useState<string | null | undefined>('');
    const [functionArgs, setFunctionArgs] = useState<any[]>([]);

    const [localValue, setLocalValue] = useState<string>('');
    const [error, setError] = useState<string | null | undefined>('');

    useEffect(() => {
        if (value) {
            const [fileName, functionName] = value.function?.split(':') || [];
            setSelectedFile(fileName);
            setSelectedFunction(functionName);
            setFunctionArgs(value.args);
            setLocalValue(arrayReplacer(value.args));
        }
    }, [value]);

    const handleFileChange = (event: any, newValue: string | null) => {
        setSelectedFile(newValue);
        setSelectedFunction(null);
        onChange({ function: `${newValue}:`, args: functionArgs });
    };

    const handleFunctionChange = (event: any, newValue: string | null) => {
        setSelectedFunction(newValue);
        const newFunction = selectedFile ? `${selectedFile}:${newValue}` : `:${newValue}`;
        onChange({ function: newFunction, args: functionArgs });
    };

    const handleArgBlur = () => {
        try {
            let parsed;
            if (isValidMixedArrayString(localValue)) {
                parsed = localValue;
            } else throw new Error('Not an array');
            onChange({ ...value, args: parsed });
            setError(null);
        } catch (err) {
            setError('Invalid format. Please enter valid array.');
        }
    };

    return (
        <Box>
            <Autocomplete
                disableClearable
                disabled={readOnly}
                value={selectedFile || ''}
                onChange={handleFileChange}
                options={functionList.map((file) => file.fileName)}
                renderInput={(params) => <TextField {...params} label="File Name" />}
                size="small"
                sx={{ mb: 1 }}
            />
            <Autocomplete
                disableClearable
                disabled={readOnly}
                value={selectedFunction || ''}
                onChange={handleFunctionChange}
                options={(functionList.find((file) => file.fileName === selectedFile)?.functions || []).map(
                    (func) => func.functionName
                )}
                renderInput={(params) => <TextField {...params} label="Function Name" />}
                size="small"
                sx={{ mb: 1 }}
            />
            <TextField
                disabled={readOnly}
                value={localValue}
                onChange={(e) => {
                    setLocalValue(e.target.value);
                    setError(null);
                }}
                onBlur={handleArgBlur}
                size="small"
                fullWidth
                multiline
                minRows={1}
                maxRows={6}
                variant="outlined"
                sx={{ width: '50%' }}
                error={Boolean(error)}
                helperText={error}
            />
        </Box>
    );
};

export const ParamNameDisplay: React.FC<ParamNameProps> = ({ paramName }) => {
    const segments = paramName.split('.');

    const renderListItems = (items: string[]) => {
        return items.map((item, index) => (
            <ListItem key={index} sx={{ pl: index * 3, py: 0 }}>
                <Typography variant="body2">
                    {index === 0 ? '' : '⠦ '} {item}
                </Typography>
            </ListItem>
        ));
    };

    return <List sx={{ p: 0 }}>{renderListItems(segments)}</List>;
};

// ================================================================================================
// Utility

function formatLine(line: string, isFirstElementBold: boolean = false): JSX.Element[] {
    line = line.replace(/"/g, "'");
    const formatRegex = /(`.*?`|Returns:|Parameters:)/g;

    const replaceFunc = (match: string, offset: number, string: string): JSX.Element => {
        if (match === 'Returns:' || match === 'Parameters:') {
            return <strong key={offset}>{match}</strong>;
        }
        if (match.startsWith('`') && match.endsWith('`')) {
            return <em key={offset}>{match.slice(1, -1)}</em>;
        }
        return <span key={offset}>{match}</span>;
    };

    const parts = line.split(formatRegex).map((part, index) => {
        if (formatRegex.test(part)) {
            return replaceFunc(part, index, line);
        } else {
            if (index === 0 && isFirstElementBold) {
                return <strong key={index}>{part}</strong>;
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        }
    });

    return parts;
}
