import { INotebookContent } from '@jupyterlab/nbformat';

export function validateJupyterNotebookFile(file: any): file is INotebookContent {
    if (!file) {
        return false;
    }
    if (typeof file !== 'object') {
        return false;
    }
    if (!Array.isArray(file?.cells)) {
        return false;
    }
    if (typeof file['nbformat'] !== 'number' || typeof file['nbformat_minor'] !== 'number') {
        return false;
    }

    return true;
}

export function clearNotebookOutputs(notebook: INotebookContent): INotebookContent {
    return {
        ...notebook,
        cells: notebook.cells.map((cell) => ({
            ...cell,
            outputs: Array.isArray(cell.outputs) ? [] : undefined,
        })),
    };
}