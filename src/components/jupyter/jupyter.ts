import { INotebookContent } from '@jupyterlab/nbformat';
import { generateCellId } from './utils';

export function normalizeNotebookContent(content: INotebookContent): INotebookContent {
    // TODO migrate to 4.5 if content param is with 4.4
    //  return 4.5 as default
    //  https://raw.githubusercontent.com/jupyter/nbformat/main/nbformat/v4/nbformat.v4.5.schema.json
    return {
        ...content,
        cells: content.cells.map((cell) => ({
            ...cell,
            ...(!cell.id
                ? {
                      id: generateCellId(),
                  }
                : {}),
        })),
        nbformat: 4,
        nbformat_minor: 4,
    };
}
