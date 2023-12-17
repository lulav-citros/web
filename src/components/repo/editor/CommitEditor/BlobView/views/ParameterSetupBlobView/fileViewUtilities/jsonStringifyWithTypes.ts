export function reversePreprocessJsonString(jsonString: string): string {
    jsonString = jsonString.replace(/"<(int|float|array_int|array_float)>(.*?)<\1>"/g, (match, p1, p2) => {
        if (p1 === 'array_int' || p1 === 'array_float') {
            return p2;
        }
        return p2;
    });

    jsonString = jsonString.replace(/"<string>(.*?)<string>"/g, '"$1"');
    jsonString = jsonString.replace(/"<(function|numpy_function)>(.*?)<\1>"/g, '"$2"');
    jsonString = jsonString.replace(/"<array_string>(.*?)<array_string>"/g, '$1');
    jsonString = jsonString.replace(/'/g, '"');

    return jsonString;
}

export function formatJSONString(jsonString: string): string {
    let indentLevel = 0;
    let inString = false;
    let escape = false;
    let output = '';

    const repeatIndent = (level: number) => '    '.repeat(level);

    for (let i = 0; i < jsonString.length; i++) {
        const currentChar = jsonString[i];
        const nextChar = jsonString[i + 1];

        // Toggle inString flag if not currently escaped
        if (currentChar === '"' && !escape) {
            inString = !inString;
        }

        if (!inString) {
            switch (currentChar) {
                case '{':
                case '[':
                    indentLevel++;
                    output += currentChar + '\n' + repeatIndent(indentLevel);
                    break;
                case '}':
                case ']':
                    indentLevel--;
                    output += '\n' + repeatIndent(indentLevel) + currentChar;
                    break;
                case ',':
                    output += currentChar + '\n' + repeatIndent(indentLevel);
                    break;
                case ':':
                    output += currentChar + ' ';
                    break;
                default:
                    output += currentChar;
            }
        } else {
            // Inside a string, just add the character
            output += currentChar;
        }

        // Handle escape character for in-string processing
        if (currentChar === '\\' && !escape) {
            escape = true;
        } else {
            escape = false;
        }
    }
    return output;
}
