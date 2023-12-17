import { INotebookContent } from '@jupyterlab/nbformat';

/**
 * Empty jupyter notebook object
 */
export const EMPTY_NOTEBOOK_CONTENT: INotebookContent = {
    metadata: {},
    cells: [],
    nbformat: 4,
    nbformat_minor: 4,
};
