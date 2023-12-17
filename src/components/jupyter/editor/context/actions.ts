import { JupyterStateActionFunction } from '../../jupyter.types';
import { CellType, ICell, INotebookContent, IOutput } from '@jupyterlab/nbformat';
import { generateCell, generateCellId, insert, moveArrayItem } from '../../utils';
import { JupyterEditorSettings, JupyterEditorState } from './types';

type JupyterEditorStateActionEditType = Partial<ICell> | ((prevCell: ICell) => Partial<ICell>);

function _editNotebookContentCellById(
    prevState: INotebookContent,
    cellId: string,
    edit: JupyterEditorStateActionEditType
): INotebookContent {
    return {
        ...prevState,
        cells: prevState.cells.map((cell) => {
            if (cell.id !== cellId) return cell;

            return {
                ...cell,
                ...(typeof edit === 'function' ? edit(cell) : edit),
            };
        }),
    };
}

function _editCellById(
    prevState: JupyterEditorState,
    cellId: string,
    edit: JupyterEditorStateActionEditType
): JupyterEditorState {
    return {
        ...prevState,
        contents: _editNotebookContentCellById(prevState.contents, cellId, edit),
    };
}

export function executeCellInitError(): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            error: "No kernel",
            executing: false
        };
    };
}

export function executeCellInitStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ..._editCellById(prevState, cellId, {
                outputs: [],
                execution_count: null,
                attachments: null,
            }),
            executing: true,
            selectedCellId: cellId,
            executingCell: cellId,
        };
    };
}

export function executeCellAddOutputStateAction(cellId: string, output: IOutput): JupyterStateActionFunction {
    return (prevState) => {
        return _editCellById(prevState, cellId, (prevCell) => ({
            outputs: Array.isArray(prevCell.outputs) ? [...prevCell.outputs, output] : [prevCell],
        }));
    };
}

export function executeCellDoneStateAction(
    cellId: string,
    execution_count: number | null,
    execution_time: number | null
): JupyterStateActionFunction {
    return (prevState) => {
        const newCellId = _getNextCellId(cellId, prevState.contents.cells);
        return {
            ...prevState,
            contents: _editNotebookContentCellById(prevState.contents, cellId, (prevCell) => ({
                ...prevCell,
                execution_count,
                metadata: {
                    ...prevCell.metadata,
                    execution: {
                        'iopub.execute_input': execution_time,
                    },
                },
            })),
            executing: false,
            executingCell: undefined,
            selectedCellId: newCellId,
        };
    };
}

export function editCellStateAction(cellId: string, cell: Partial<ICell>): JupyterStateActionFunction {
    return (prevState) => {
        return _editCellById(prevState, cellId, cell);
    };
}

export function addCellStateAction(
    cell: ICell,
    afterCellId: string | null,
    position?: 'before' | 'after'
): JupyterStateActionFunction {
    return (prevState) => {
        let atIndex = afterCellId != null ? prevState.contents.cells.findIndex((cell) => cell.id === afterCellId) : -1;
        if (atIndex === -1) atIndex = position === 'before' ? 0 : prevState.contents.cells.length - 1;

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: insert(prevState.contents.cells, atIndex + 1, cell),
            },
            selectedCellId: cell.id ? String(cell.id) : null,
            editCellId: cell.id ? String(cell.id) : null,
        };
    };
}

export function removeCellStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        const cells = prevState.contents.cells;
        const newSelectedCellId = _getNextOrPreviousCellId(cellId, cells);

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: prevState.contents.cells.filter((cell) => cell.id !== cellId),
            },
            selectedCellId: prevState.selectedCellId === cellId ? newSelectedCellId : prevState.selectedCellId,
            editCellId: prevState.editCellId === cellId ? newSelectedCellId : prevState.editCellId,
        };
    };
}

export function duplicateCellStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        const duplicatedCellIndex = prevState.contents.cells.findIndex((cell) => cell.id === cellId);
        if (duplicatedCellIndex === -1) {
            return prevState;
        }
        const duplicatedCell = prevState.contents.cells[duplicatedCellIndex];

        const newCellId = generateCellId();

        const newCell: ICell = {
            ...duplicatedCell,
            execution_count: null,
            outputs: [],
            attachments: undefined,
            metadata: {},
            id: newCellId,
        };

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: insert(prevState.contents.cells, duplicatedCellIndex + 1, newCell),
            },
            editCellId: newCellId,
            selectedCellId: newCellId,
        };
    };
}

export function swapCellStateAction(fromCellId: string, toCellId: string): JupyterStateActionFunction {
    return (prevState) => {
        const fromIndex = prevState.contents.cells.findIndex((cell) => cell.id === fromCellId);
        const toIndex = prevState.contents.cells.findIndex((cell) => cell.id === toCellId);
        if (fromIndex === -1 || toIndex === -1) return prevState;

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: moveArrayItem(prevState.contents.cells, fromIndex, toIndex),
            },
            selectedCellId: fromCellId,
            editCellId: null,
        };
    };
}

export function moveCellUpStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        const prevIndex = prevState.contents.cells.findIndex((cell) => cell.id === cellId);

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: moveArrayItem(prevState.contents.cells, prevIndex, prevIndex + 1),
            },
            selectedCellId: cellId,
            // editCellId: null,
        };
    };
}

export function moveCellDownStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        const prevIndex = prevState.contents.cells.findIndex((cell) => cell.id === cellId);

        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: moveArrayItem(prevState.contents.cells, prevIndex, prevIndex - 1),
            },
            selectedCellId: cellId,
            // editCellId: null,
        };
    };
}

export function clearCellOutputsStateAction(cellId: string): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: prevState.contents.cells.map((cell) => {
                    if (cell.id !== cellId) return cell;

                    return {
                        ...cell,
                        execution_count: null,
                        outputs: [],
                    };
                }),
            },
        };
    };
}

// --------------- ALL CELLS ----------------------

export function clearAllCellsOutputsStateAction(): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: prevState.contents.cells.map((cell) => {
                    if (cell.cell_type !== 'code') {
                        return cell;
                    }

                    return {
                        ...cell,
                        outputs: [],
                    };
                }),
            },
        };
    };
}

export function executeAllCellsInitStateAction(): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            executing: true,
            contents: {
                ...prevState.contents,
                cells: prevState.contents.cells.map((cell) => {
                    if (cell.cell_type === 'code') {
                        return {
                            ...cell,
                            execution_count: null,
                            outputs: [],
                        };
                    }
                    return cell;
                }),
            },
        };
    };
}

export function executeAllCellsEndStateAction(): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            executing: false,
            executingCell: undefined,
        };
    };
}

export function selectCellStateAction(cellId: string | null): JupyterStateActionFunction {
    return (prevState) => {
        if (prevState.selectedCellId === cellId) {
            return prevState;
        }

        return {
            ...prevState,
            selectedCellId: cellId,
            cellType:
                (prevState.contents.cells.find((cell) => cell.id === cellId)?.cell_type as CellType) ||
                prevState.cellType,
        };
    };
}

export function replaceCellStateAction(cellId: number, cell: ICell): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            contents: {
                ...prevState.contents,
                cells: prevState.contents?.cells.map((currentCell) => {
                    if (currentCell.id === cellId) {
                        return cell;
                    }
                    return { ...currentCell };
                }),
            },
        };
    };
}

export function setCellTypeStateAction(cellType: ICell['cell_type']): JupyterStateActionFunction {
    return (prevState) => {
        const selectedCell = prevState.contents.cells.find((cell) => cell.id === prevState.selectedCellId);
        const isSameType = selectedCell?.cell_type === cellType;

        if (!selectedCell || isSameType) {
            return {
                ...prevState,
                cellType,
            };
        }

        return {
            ...prevState,
            cellType,
            contents: {
                ...prevState.contents,
                cells: prevState.contents.cells.map((cell) => {
                    if (prevState.selectedCellId !== cell.id) {
                        return cell;
                    }
                    const newCell = generateCell(cellType);
                    newCell.source = cell.source;
                    return newCell;
                }),
            },
        };
    };
}

export function setCellEditModeStateAction(cellId: string | null): JupyterStateActionFunction {
    return (prevState) => ({
        ...prevState,
        selectedCellId: cellId,
        editCellId: cellId,
    });
}

export function setSettingsJupyterStateAction(settings?: Partial<JupyterEditorSettings>): JupyterStateActionFunction {
    return (prevState) => {
        return {
            ...prevState,
            settings: {
                ...prevState.settings,
                ...settings,
            },
        };
    };
}

// --------------- UTILS ----------------------

function _getNextOrPreviousCellId(cellId: string, cells: ICell[]): string | null {
    const cellIndex = cells.findIndex((cell) => cell.id === cellId);
    return (cells[cellIndex + 1]?.id || cells[cellIndex - 1]?.id || null) as string | null;
}

function _getNextCellId(cellId: string, cells: ICell[]): string | null {
    const cellIndex = cells.findIndex((cell) => cell.id === cellId);
    return (cells[cellIndex + 1]?.id || cellId) as string | null;
}
