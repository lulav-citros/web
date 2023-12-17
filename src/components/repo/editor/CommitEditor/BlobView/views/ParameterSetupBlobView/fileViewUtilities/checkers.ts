import { ArrayType, ValidTypes } from './types';

function getTypeOfArrayValue(value: string): ArrayType | null {
    if (/^-?\d+$/.test(value)) {
        return 'array_int';
    } else if (/^-?\d+\.\d+$/.test(value)) {
        return 'array_float';
    }
    return null;
}

export function arrayItemsTypeEqual(array: any[], desiredType: ArrayType | 'array_string'): boolean {
    for (let item of array) {
        if (Array.isArray(item)) {
            if (!arrayItemsTypeEqual(item, desiredType)) {
                return false;
            }
        } else if (typeof item === 'string') {
            if (desiredType === 'array_string') {
                const type = getTypeOfArrayValue(item);
                if (type !== null) {
                    return false;
                }
            } else {
                if (getTypeOfArrayValue(item) !== desiredType) {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    return true;
}

export function isOfType(value: string | string[] | any[], type: ValidTypes): boolean {
    const isInt = (str: string) => /^-?\d+$/.test(str);
    const isFloat = (str: string) => {
        return /^-?\d+(\.\d+)?(e[-+]?\d+)?$/i.test(str);
    };
    const isString = (str: string) => typeof str === 'string' && getTypeOfArrayValue(str) === null;

    switch (type) {
        case 'int':
            return isInt(value as string);
        case 'float':
            return isFloat(value as string);
        case 'string':
            return isString(value as string);
        case 'array_int':
        case 'array_float':
        case 'array_string':
            return arrayItemsTypeEqual(value as any[], type);
        default:
            return false;
    }
}

export function isValidArrayString(str: string): boolean {
    if (!str.startsWith('[') || !str.endsWith(']')) {
        return false;
    }

    function checkSegment(segment: string): boolean {
        segment = segment.trim();

        if (segment.startsWith('[') && segment.endsWith(']')) {
            return isValidArrayString(segment);
        } else if (segment.startsWith("'") && segment.endsWith("'")) {
            return /^'((\\['\\]|[^\'])*)'$/.test(segment);
        }
        return false;
    }

    let segments = [];
    let segmentStart = 1;
    let inString = false;
    let escape = false;

    for (let i = 1; i < str.length - 1; i++) {
        const char = str[i];
        if (char === "'" && !escape) {
            inString = !inString;
        }
        escape = char === '\\' && !escape;
        if (char === ',' && !inString) {
            segments.push(str.substring(segmentStart, i));
            segmentStart = i + 1;
        } else if (i === str.length - 2) {
            segments.push(str.substring(segmentStart, i + 1));
        }
    }
    return segments.every((segment) => checkSegment(segment));
}

export function isValidMixedArrayString(str: string): boolean {
    if (!str.startsWith('[') || !str.endsWith(']')) {
        return false;
    }

    function checkSegment(segment: string): boolean {
        segment = segment.trim();

        if (segment.startsWith('[') && segment.endsWith(']')) {
            return isValidMixedArrayString(segment);
        } else if (segment.startsWith("'") && segment.endsWith("'")) {
            return /^'((\\['\\]|[^\'])*)'$/.test(segment);
        } else if (!isNaN(parseFloat(segment)) && segment.trim() !== '') {
            return true;
        }

        return false;
    }

    let segments = [];
    let segmentStart = 1;
    let inString = false;
    let escape = false;

    for (let i = 1; i < str.length - 1; i++) {
        const char = str[i];

        if (char === "'" && !escape) {
            inString = !inString;
        }

        escape = char === '\\' && !escape;

        if (char === ',' && !inString) {
            segments.push(str.substring(segmentStart, i));
            segmentStart = i + 1;
        } else if (i === str.length - 2) {
            segments.push(str.substring(segmentStart, i + 1));
        }
    }

    return segments.every((segment) => checkSegment(segment));
}
