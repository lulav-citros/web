export type InputType = string | Record<string, any>;
export type GenericObject = { [key: string]: string };
export type ArrayType = 'array_int' | 'array_float';
export type ValidTypes = 'int' | 'float' | 'string' | 'array_int' | 'array_float' | 'array_string';
export interface ParamNameProps {
    paramName: string;
}

export interface ParameterSetupFileViewProps {
    value?: string;
    initialValue?: string;
    onChange: (value: string) => void;
    onClick?: (e: MouseEvent) => void;
    onBlur?: () => void;
    readOnly?: boolean;
}

export interface NumpyFunction {
    name: string;
    numArgs: number;
}

export interface NumpyFunctionObj {
    name: string;
    description: string;
    link: string;
}

export type ParameterSetupRaw = {
    packages: {
        [packageName: string]: {
            [nodeName: string]: {
                ros__parameters: {
                    [paramName: string]: any;
                };
            };
        };
    };
};

export interface FlattenedRow {
    id: string;
    packageName: string;
    nodeName: string;
    paramName: string;
    paramType: string;
    paramValue: any;
}

export type PythonFunction = {
    functionName: string;
    args: any[];
    numberOfArgs: number;
};

export type PythonFile = {
    fileName: string;
    functions: PythonFunction[];
};

export type FunctionList = PythonFile[];

export interface NumpyFunctionInputProps {
    value: any;
    onChange: (value: any) => void;
    id: string;
    readOnly?: boolean;
}

export interface FunctionInputProps {
    value: {
        function: string;
        args: any[];
    };
    functionList: {
        fileName: string;
        functions: {
            functionName: string;
            args: string[];
            numberOfArgs: number;
        }[];
    }[];
    onChange: (newValue: any) => void;
    id: string;
    readOnly?: boolean;
}

export interface ParamValueTextFieldProps {
    paramType: string;
    paramValue: any;
    handleValueChange: (id: string, newValue: any) => void;
    rowId: string;
    readOnly?: boolean;
}
