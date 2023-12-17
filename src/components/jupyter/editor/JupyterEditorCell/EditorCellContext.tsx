import { createContext, PropsWithChildren, useContext } from 'react';
import { useJupyterEditorContext } from '../context';
import { ICell } from '@jupyterlab/nbformat';

export interface EditorCellContextType<T extends ICell> {
    readonly?: boolean;
    isSelected: boolean;
    isEditing: boolean;
    isLoading: boolean;
    isExecuting: boolean;
    cell: T;
    setCellEditMode: (value: boolean) => void;
    editSource: (text: string) => void;
    selectCell: () => void;
    deselectCell: () => void;
    editCell: (cell: Partial<T>) => void;
    deleteCell: () => void;
    duplicateCell: () => void;
    moveUp: () => void;
    moveDown: () => void;
    executeCell: () => void;
}

const EditorCellContext = createContext<EditorCellContextType<ICell>>({} as EditorCellContextType<ICell>);

export interface EditorCellProviderProps<T> {
    cell: T;
}

export function EditorCellProvider<T extends ICell>({ children, cell }: PropsWithChildren<EditorCellProviderProps<T>>) {
    const {
        config: { readonly },
        state: { selectedCellId, editCellId, executingCell },
        actions,
    } = useJupyterEditorContext();

    const cellId = cell.id as string;
    const isSelected = selectedCellId === cellId;
    const isEditing = editCellId === cellId;
    const isExecuting = executingCell === cellId;
    const isLoading = isSelected && isExecuting;

    const editCell = (cell: Partial<ICell>) => {
        actions.editCell(cellId, cell);
    };

    const editSource = (value: string) => {
        actions.editCell(cellId, {
            source: value || '',
            execution_count: null,
        });
    };

    const selectCell = () => {
        actions.selectCell(cellId);
    };

    const deselectCell = () => {
        if (!isSelected) return;
        actions.selectCell(null);
    };

    const setCellEditMode = (value: boolean) => {
        actions.setEditMode(value ? cellId : editCellId === cellId ? null : editCellId);
    };

    const deleteCell = () => {
        actions.removeCell(cellId);
    };

    const duplicateCell = () => {
        actions.duplicateCell(cellId);
    };

    const moveUp = () => {
        // index decrease
        actions.moveCellDown(cellId);
    };

    const moveDown = () => {
        // index increase
        actions.moveCellUp(cellId);
    };

    const executeCell = () => {
        actions.executeCell(cellId);
    };

    return (
        <EditorCellContext.Provider
            value={{
                readonly,
                isSelected,
                isEditing,
                isLoading,
                isExecuting,
                cell,
                setCellEditMode,
                editSource,
                selectCell,
                deselectCell,
                editCell,
                deleteCell,
                duplicateCell,
                moveUp,
                moveDown,
                executeCell,
            }}
        >
            {children}
        </EditorCellContext.Provider>
    );
}

export function useEditorCell<T extends ICell>(): EditorCellContextType<T> {
    return useContext<EditorCellContextType<T>>(EditorCellContext as any);
}
