export class JupyterLogger {
    private readonly LOGGER_NAME = 'JUPYTER';

    constructor() {}

    log(module: string, message: string, ...args: any[]) {
        console.log(`${this.LOGGER_NAME}:${module} - ${message}`, ...args);
    }
}

const logger = new JupyterLogger();

export default logger;
