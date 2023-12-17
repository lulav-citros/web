import { ParameterSetupRaw, FlattenedRow, InputType, ArrayType, ValidTypes } from './types';
import { isOfType } from './checkers';

// ==============================================================================================================
// Parsing JSON with typed strings

function extractDataType(input: InputType): string | null {
    function extractFromString(s: string): string | null {
        const match = s.match(/<(.+?)>.+?<\1>/);
        return match ? match[1] : 'string';
    }
    if (typeof input === 'string') {
        return extractFromString(input);
    }
    const firstKey = Object.keys(input)[0];
    if (firstKey && typeof input[firstKey] === 'string') {
        if (isObjectFunction(input)) {
            if (input.function.includes('numpy.')) {
                return 'numpy_function';
            } else if (input.function.includes('.py')) {
                return 'function';
            }
            return extractFromString(input['function']);
        }
    }
    return null;
}

function parseObjectRecursive(
    obj: object,
    paramName: string,
    nodeName: string,
    packageName: string,
    paramValuesArray: any[]
): any {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null && !isObjectFunction(value)) {
            parseObjectRecursive(value, `${paramName}.${key}`, nodeName, packageName, paramValuesArray);
        } else {
            const determinedType = extractDataType(value);
            const parsedValue = processValue(value);
            paramValuesArray.push({
                id: `${packageName}_${nodeName}_${paramName}_${key}`,
                packageName,
                nodeName,

                paramName: `${paramName}.${key}`,
                paramType: determinedType,
                paramValue: parsedValue,
            });
        }
    }
    return paramValuesArray;
}

function removeDataType(s: string): string {
    const match = s.match(/^<.+?>(.+)<.+?>$/);
    return match ? match[1] : s;
}

function isNestedArray(s: string): boolean {
    return /^\[([\[\]\d.,\s]+)\]$/.test(s) && !/["']/.test(s);
}

function isObjectFunction(obj: object): boolean {
    const properties = Object.keys(obj);
    return properties.length === 2 && properties.includes('function') && properties.includes('args');
}

function processValue(value: any): any {
    if (typeof value === 'string') {
        let processedValue = removeDataType(value);
        if (isNestedArray(processedValue)) {
            const parsedArr = processedValue.replace(/\d+(?:\.\d+)?/g, (match) => `"${match}"`);
            return JSON.parse(parsedArr);
        } else {
            if (value === '<string><string>') {
                return '';
            }
            return processedValue;
        }
    } else if (typeof value === 'object' && value !== null) {
        for (const key in value) {
            value[key] = processValue(value[key]);
        }
    }
    return value;
}

export const flattenParameterSetup = (parameterSetup: ParameterSetupRaw): FlattenedRow[] => {
    const rows: any[] = [];
    if (!parameterSetup || !parameterSetup.packages) return rows;
    for (const [packageName, packageContent] of Object.entries(parameterSetup.packages)) {
        for (const [nodeName, nodeContent] of Object.entries(packageContent)) {
            for (const [paramName, paramValue] of Object.entries(nodeContent.ros__parameters)) {
                let valueIsObject = false;
                if (typeof paramValue === 'object' && !isObjectFunction(paramValue)) {
                    valueIsObject = true;
                }
                if (!valueIsObject) {
                    const determinedType = extractDataType(paramValue);
                    const parsedValue = processValue(paramValue);
                    if (paramValue) {
                        rows.push({
                            id: `${packageName}_${nodeName}_${paramName}`,
                            packageName,
                            nodeName,
                            paramName,
                            paramType: determinedType,
                            paramValue: parsedValue,
                        });
                    }
                } else {
                    const paramValuesArray: any[] = [];
                    parseObjectRecursive(paramValue, paramName, nodeName, packageName, paramValuesArray);
                    rows.push(...paramValuesArray);
                }
            }
        }
    }
    return rows;
};

// ==============================================================================================================
// Custom Local Parsers
export const arrayReplacer = (array: any[] | null | undefined): string => {
    if (!array || array.length === 0) return '';
    return JSON.stringify(array)
        .replace(/"(-?\d+\.\d+)"/g, '$1')
        .replace(/"([^"]+)"/g, '$1')
        .replace(/,/g, ', ');
};

export const stringArrayNumericParse = (text: string) => {
    if (typeof text !== 'string') {
        throw new Error('Expected a string value');
    }
    const modifiedText = text.replace(/(-?\d+\.0)(?=\]|\,|\s)/g, (match) => `"${match}"`);
    return JSON.parse(modifiedText);
};

// ==============================================================================================================
// Utilities for Python fucntions

export function collectPyFiles(inputObj: any): string[] {
    const functionsObj = inputObj.children?.functions?.children;
    if (!functionsObj) return [];

    const result: string[] = [];
    for (const key in functionsObj) {
        const value = functionsObj[key];
        if (value.name && value.name.endsWith('.py')) {
            result.push(value.name);
        }
    }
    return result;
}

export const parsePythonFunctions = (fileContent: string) => {
    const functionRegex = /def\s+([\w_]+)\s*\(([^)]*)\)/g;
    const matches = [...fileContent.matchAll(functionRegex)];

    return matches.map((match) => ({
        functionName: match[1],
        args: match[2].split(',').map((arg) => arg.trim()),
        numberOfArgs: match[2].split(',').length,
    }));
};

// ==========================================================================================================
// Formatters
function wrapWithType(value: any, type: string): string {
    return `<${type}>${value}<${type}>`;
}

function formatArray(value: any[], type: string): string {
    const formatValue = (v: any) => {
        return v;
    };
    if (typeof value === 'string') {
        return `<${type}>${value}<${type}>`;
    }

    const formatNestedArray = (nestedArray: any[], type: string): string => {
        return nestedArray
            .map((v) => {
                return Array.isArray(v) ? `[${formatNestedArray(v, type)}]` : formatValue(v);
            })
            .join(',');
    };
    const formattedArray = formatNestedArray(value, type);
    return `<${type}>[${formattedArray}]<${type}>`;
}

function formatFunction(paramValue: any, paramType: string): any {
    let argsType = 'array_string';
    if (isOfType(paramValue.args, 'array_int')) {
        argsType = 'array_int';
    } else if (isOfType(paramValue.args, 'array_float')) {
        argsType = 'array_float';
    }
    const argsFormatted = formatArray(paramValue.args, argsType);
    const functionString = wrapWithType(paramValue.function, paramType);
    return {
        function: functionString,
        args: argsFormatted,
    };
}

// ==============================================================================================================
// Reconstruct typed object
export function reconstructParameterSetup(flatParams: any[]): ParameterSetupRaw {
    const reconstructed: ParameterSetupRaw = { packages: {} };

    flatParams.forEach((param) => {
        const packageObj =
            reconstructed.packages[param.packageName] || (reconstructed.packages[param.packageName] = {});
        const nodeObj = packageObj[param.nodeName] || (packageObj[param.nodeName] = { ros__parameters: {} });
        const rosParameters = nodeObj.ros__parameters;

        let value;
        if (param.paramType === 'function' || param.paramType === 'numpy_function') {
            value = formatFunction(param.paramValue, param.paramType);
        } else if (param.paramType.startsWith('array')) {
            value = formatArray(param.paramValue, param.paramType);
        } else {
            value = wrapWithType(param.paramValue.toString(), param.paramType);
        }

        setNestedObjectValue(rosParameters, param.paramName, value);
    });

    return reconstructed;
}

function setNestedObjectValue(obj: any, path: string, value: any) {
    const parts = path.split('.');
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
            current[part] = {};
        }
        current = current[part];
    }

    current[parts[parts.length - 1]] = value;
}

// ==============================================================================================================
// Default values
export const getDefaultParamValue = (type: string, defaultFunction?: string) => {
    switch (type) {
        case 'int':
            return '0';
        case 'float':
            return '0.0';
        case 'string':
            return ' ';
        case 'array_int':
            return '[0]'.replace(/'/g, '"');
        case 'array_float':
            return '[1.0]'.replace(/'/g, '"');
        case 'array_string':
            return "['text']";
        case 'numpy_function':
            return {
                args: ['0.0'],
                function: 'numpy.random.rand',
            };
        case 'function':
            return {
                args: ['0.0'],
                function: defaultFunction,
            };
        default:
            return null;
    }
};
