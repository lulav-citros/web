function wrapValue(value: string, isKey: boolean = false): string {
    if (isKey) {
        return value;
    }
    value = value.trim();
    if (value.includes('numpy.')) {
        return `"<numpy_function>${value.slice(1, -1)}<numpy_function>"`;
    } else if (value.includes('.py')) {
        return `"<function>${value.slice(1, -1)}<function>"`;
    } else if (value.startsWith('"') && value.endsWith('"')) {
        return `"<string>${value.slice(1, -1)}<string>"`;
    } else if (value.includes('.') && !value.endsWith('.0')) {
        return `"<float>${value}<float>"`;
    } else if (value.endsWith('.0')) {
        return `"<float>${value}<float>"`;
    } else if (/^\d+$/.test(value)) {
        return `"<int>${value}<int>"`;
    } else {
        return value;
    }
}

function wrapArray(value: string): string {
    let depth = 0;
    let result = '';
    let type = 'array_int';
    let isInString = false;

    if (value.includes('"')) {
        type = 'array_string';
    } else if (value.includes('.')) {
        type = 'array_float';
    }

    for (let i = 0; i < value.length; i++) {
        const char = value[i];

        if (char === '"') {
            isInString = !isInString;
            result += "'";
        } else if (char === '[') {
            depth++;
            if (depth === 1) {
                result += char;
            } else {
                result += char;
            }
        } else if (char === ']') {
            depth--;
            if (depth === 0) {
                result += char;
            } else {
                result += char;
            }
        } else if (!isInString && (char === '\n' || char === '\r')) {
            continue;
        } else {
            result += char;
        }
    }
    return `"<${type}>${result}<${type}>"`;
}

function processBlock(block: string): string {
    let i = 0;
    let result = '';
    while (i < block.length) {
        if (block[i] === '[') {
            let arrayStart = i;
            let depth = 1;
            i++;
            while (i < block.length && depth !== 0) {
                if (block[i] === '[') depth++;
                else if (block[i] === ']') depth--;
                i++;
            }
            const fullArray = block.substring(arrayStart, i);
            result += wrapArray(fullArray);
        } else if (block[i] === '"') {
            let stringStart = i;
            i++;
            while (i < block.length && block[i] !== '"') {
                if (block[i] === '\\') i++;
                i++;
            }
            i++;
            const fullString = block.substring(stringStart, i);

            let isKey = false;
            for (let j = i; j < block.length; j++) {
                if (block[j] === ':') {
                    isKey = true;
                    break;
                } else if (!/\s/.test(block[j])) {
                    break;
                }
            }

            result += wrapValue(fullString, isKey);
        } else if (block[i] === '{' || block[i] === '}') {
            result += block[i];
            i++;
        } else {
            result += block[i];
            i++;
        }
    }
    return result.replace(/":\s?("(?:[^"\\]|\\.)*"|[^\n,]*)/g, (match, val) => {
        val = val.trim();
        if (!val.startsWith('[') && !val.startsWith('"')) {
            return '": ' + wrapValue(val);
        }
        return match;
    });
}

export function preprocessJsonString(jsonStr: string): string {
    let level = 0;
    let blockStart = -1;
    let processedStr = '';

    for (let i = 0; i < jsonStr.length; i++) {
        const char = jsonStr[i];

        if (char === '{') {
            level++;

            if (level === 1) {
                blockStart = i;
            }
        } else if (char === '}') {
            level--;

            if (level === 0 && blockStart !== -1) {
                const block = jsonStr.substring(blockStart + 1, i);
                processedStr += '{' + processBlock(block) + '}';
                blockStart = -1;
            }
        } else {
            if (level === 0) {
                processedStr += char;
            }
        }
    }

    console.log('preprocessed: ', processedStr);
    return processedStr;
}
