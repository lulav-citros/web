import { JupyterEditorState } from './editor/context/types';

export function getCellIndex(state: JupyterEditorState, cellId: string): number {
    return state.contents.cells.findIndex((cell) => (cell.id = cellId));
}
