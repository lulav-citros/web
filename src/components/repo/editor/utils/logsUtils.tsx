interface LogEntry {
    timestamp: string;
    application: string;
    level: string;
    message: string;
}

export function parseLogs(fileData: string): LogEntry[] {
    if (!fileData) {
        return [];
    }

    const lines = fileData.split('\n');
    const logs: LogEntry[] = [];

    for (const line of lines) {
        const matches = line.match(/\[(.*?)\]\s*\[(.*?)\]\s*\[(.*?)\]:\s*(.*)/);

        if (matches) {
            const log: LogEntry = {
                timestamp: matches[1],
                application: matches[2],
                level: matches[3],
                message: matches[4],
            };

            logs.push(log);
        }
    }
    return logs;
}

export const logTokenizer = {
    root: [
        { regex: /\b(Trace)\b:/, action: { token: 'verbose.log' } },
        { regex: /\[(verbose|verb|vrb|vb|v)\]/i, action: { token: 'verbose.log' } },
        { regex: /\bV\//, action: { token: 'verbose.log' } },
        { regex: /\b(DEBUG|Debug)\b|\b([dD][eE][bB][uU][gG])\:/, action: { token: 'debug.log' } },
        { regex: /\[(debug|dbug|dbg|de|d)\]/i, action: { token: 'debug.log' } },
        { regex: /\bD\//, action: { token: 'debug.log' } },
        {
            regex: /\b(HINT|INFO|INFORMATION|Info|NOTICE|II)\b|\b([iI][nN][fF][oO]|[iI][nN][fF][oO][rR][mM][aA][tT][iI][oO][nN])\:/,
            action: { token: 'info.log' },
        },
        { regex: /\[(information|info|inf|in|i)\]/i, action: { token: 'info.log' } },
        { regex: /\bI\//, action: { token: 'info.log' } },
        { regex: /\b(WARNING|WARN|Warn|WW)\b|\b([wW][aA][rR][nN][iI][nN][gG])\:/, action: { token: 'warning.log' } },
        { regex: /\[(warning|warn|wrn|wn|w)\]/i, action: { token: 'warning.log' } },
        { regex: /\bW\//, action: { token: 'warning.log' } },
        {
            regex: /\b(ALERT|CRITICAL|EMERGENCY|ERROR|FAILURE|FAIL|Fatal|FATAL|Error|EE)\b|\b([eE][rR][rR][oO][rR])\:/,
            action: { token: 'error.log' },
        },
        { regex: /\[(error|eror|err|er|e|fatal|fatl|ftl|fa|f)\]/i, action: { token: 'error.log' } },
        { regex: /\bE\//, action: { token: 'error.log' } },
        { regex: /\b\d{4}-\d{2}-\d{2}(T|\b)/, action: { token: 'date.log' } },
        { regex: /\b\d{2}[^\w\s]\d{2}[^\w\s]\d{4}\b/, action: { token: 'date.log' } },
        { regex: /\d{1,2}:\d{2}(:\d{2}([.,]\d{1,})?)?(Z| ?[+-]\d{1,2}:\d{2})?\b/, action: { token: 'date.log' } },
        { regex: /\b([0-9a-fA-F]{40}|[0-9a-fA-F]{10}|[0-9a-fA-F]{7})\b/, action: { token: 'constant.log' } },
        { regex: /[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}/, action: { token: 'constant.log' } },
        { regex: /\b([0-9]+|true|false|null)\b/, action: { token: 'constant.log' } },
        { regex: /"[^"]*"/, action: { token: 'string.log' } },
        { regex: /(?<![\w])'[^']*'/, action: { token: 'string.log' } },
        { regex: /\b([a-zA-Z.]*Exception)\b/, action: { token: 'exceptiontype.log' } },
        { regex: /^[\t ]*at.*$/, action: { token: 'exception.log' } },
        { regex: /\b(http|https|ftp|file):\/\/\S+\b\/?/, action: { token: 'constant.log' } },
        { regex: /(?<![\w/\\])([\w-]+\.)+([\w-])+(?![\w/\\])/, action: { token: 'constant.log' } },
    ],
};
