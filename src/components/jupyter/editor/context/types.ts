import { CellType, ICell, INotebookContent } from '@jupyterlab/nbformat';

export interface JupyterEditorSettings {
    autoScroll: boolean;
}

export type JupyterEditorState = {
    fetching: boolean;
    saving: boolean;
    executing: boolean;
    executingCell?: string;
    error?: string;
    contents: INotebookContent;
    selectedCellId: string | null;
    editCellId: string | null;
    cellType: CellType;
    settings: JupyterEditorSettings;
};

export type JupyterEditorStateActions = {
    setEditMode: (cellId: string | null) => void;
    setCellType: (cellType: CellType) => void;
    selectCell: (cellId: string | null) => void;
    replaceCell: (cell: ICell, cellIndex: number) => void;
    executeCell: (cellId: string, onDone?: () => void) => void;
    executeAll: () => void;
    editCell: (cellId: string, cell: Partial<ICell>) => void;
    addCell: (cell: ICell, afterCellId: string | null, position?: 'before' | 'after') => void;
    addNewCell: (cellId?: string, cellType?: CellType) => void;
    removeCell: (cellId: string) => void;
    duplicateCell: (cellId: string) => void;
    swapCell: (fromCellId: string, toCellId: string) => void;
    moveCellUp: (cellId: string) => void;
    moveCellDown: (cellId: string) => void;
    saveContents: () => void;
    clearAllOutputs: () => void;
    setSettings: (settings: Partial<JupyterEditorSettings>) => void;
};

export type JupyterEditorConfig = {
    readonly: boolean;
};

export type JupyterEditorContextActions = JupyterEditorStateActions;

export type JupyterEditorContextType = {
    config: JupyterEditorConfig;
    state: JupyterEditorState;
    actions: JupyterEditorContextActions;
    changeIndicator: boolean;
};

export type JupyterEditorAction =
    | { type: 'SET_STATE_FROM_NOTEBOOK'; notebook: INotebookContent }
    | { type: 'SET_EDIT_MODE'; cellId: string | null }
    | { type: 'SET_CELL_TYPE'; cellType: ICell['cell_type'] }
    | { type: 'SET_FETCHING'; fetching: boolean }
    | { type: 'SET_SAVING'; saving: boolean }
    | { type: 'SET_EXECUTING'; executing: boolean }
    | { type: 'SET_SELECTED_CELL'; cellId: string | null }
    | { type: 'SET_CELL_CONTENT'; cellContent: Partial<ICell> }
    | { type: 'SET_SETTINGS'; settings: any };
