import { JupyterEditorState } from './editor/context';

declare module '@jupyterlab/nbformat' {
    export interface ICodeCellMetadata {
        execution?: {
            'iopub.execute_input': number | null;
            'iopub.status.busy': number | null;
            'shell.execute_reply': number | null;
            'iopub.status.idle': number | null;
        };
    }
}

export type JupyterStateActionFunction = (prevState: JupyterEditorState) => JupyterEditorState;
