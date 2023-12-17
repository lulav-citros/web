import { INotebookContent } from '@jupyterlab/nbformat';
import { Repo } from './repo';

export interface Notebook {
    id: string;
    userId: string;

    name: string;
    description: string;

    projectId: string;
    project?: Repo;

    content: INotebookContent;

    createdAt: Date | string | number;
    updatedAt: Date | string | number;
}
