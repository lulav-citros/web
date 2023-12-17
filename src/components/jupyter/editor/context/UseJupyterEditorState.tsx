import { ICell, INotebookContent, IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { JupyterEditorState, JupyterEditorStateActions } from './types';
import { KernelManageContextType } from '../../kernel';
import { useCallback, useEffect, useState } from 'react';
import { normalizeNotebookContent } from '../../jupyter';
import { generateCell, joinSource } from '../../utils';
import {
    addCellStateAction,
    clearAllCellsOutputsStateAction,
    clearCellOutputsStateAction,
    duplicateCellStateAction,
    editCellStateAction,
    executeAllCellsEndStateAction,
    executeAllCellsInitStateAction,
    executeCellAddOutputStateAction,
    executeCellDoneStateAction,
    executeCellInitError,
    executeCellInitStateAction,
    moveCellDownStateAction,
    moveCellUpStateAction,
    removeCellStateAction,
    replaceCellStateAction,
    selectCellStateAction,
    setCellEditModeStateAction,
    setCellTypeStateAction,
    setSettingsJupyterStateAction,
    swapCellStateAction,
} from './actions';

import {
    fromKernelDisplayDataMessage,
    fromKernelErrorMessage,
    fromKernelExecuteResultMessage,
    fromKernelStreamMessage,
} from '../../jupyter.message';
import { EMPTY_NOTEBOOK_CONTENT } from '../consts';
import { JupyterStateActionFunction } from '../../jupyter.types';
import { useSnackbar } from 'notistack';

export interface UseJupyterEditorStateReturn {
    state: JupyterEditorState;
    actions: JupyterEditorStateActions;
}

export interface UseJupyterEditorStateProps {
    notebook: INotebookContent;
    notebookContext?: Record<string, any>;
    initialState: Partial<JupyterEditorState> | undefined;
    onSave: (notebook: INotebookContent) => void;
    onChange?: (notebook: INotebookContent) => void;
    kernel: KernelManageContextType;
}

function generateInitialState(notebook: any, initialState?: Partial<JupyterEditorState>): JupyterEditorState {
    return {
        contents: EMPTY_NOTEBOOK_CONTENT,
        fetching: false,
        saving: false,
        executing: false,
        editCellId: null,
        selectedCellId: null,
        cellType: 'code',
        settings: { autoScroll: false },
        ...initialState,
    };
}

function jupyterStateActionMiddleware(
    action: JupyterStateActionFunction,
    onState: (state: JupyterEditorState) => void
): JupyterStateActionFunction {
    return (prevState) => {
        const state = action(prevState);

        onState(state);
        return state;
    };
}

export function useJupyterEditorState({
    notebook,
    onSave,
    onChange,
    initialState,
    kernel,
}: UseJupyterEditorStateProps): UseJupyterEditorStateReturn {
    const { enqueueSnackbar } = useSnackbar();
    
    const [state, setState] = useState<JupyterEditorState>(generateInitialState(notebook, initialState));

    useEffect(() => {
        setState((prevState) => {
            const normalizedContent = normalizeNotebookContent(notebook);
            return {
                ...prevState,
                contents: normalizedContent,
                executing: false,
                executingCell: undefined,
            };
        });
    }, [notebook]);

    const onState = useCallback(
        (state: JupyterEditorState) => {
            onChange?.(state.contents);
        },
        [onChange]
    );

    const setStateOnChange = useCallback(
        (action: JupyterStateActionFunction) => {
            setState(jupyterStateActionMiddleware(action, onState));
        },
        [onState]
    );

    const saveContents = useCallback(() => {
        if (!state.contents) {
            return;
        }

        onSave(state.contents);
    }, [state.contents, onSave]);

    const setEditMode: JupyterEditorStateActions['setEditMode'] = (cellId) => {
        setState(setCellEditModeStateAction(cellId));
    };

    const setCellType: JupyterEditorStateActions['setCellType'] = (cellType) => {
        setStateOnChange(setCellTypeStateAction(cellType));
    };

    const replaceCell: JupyterEditorStateActions['replaceCell'] = (cell, cellId) => {
        setStateOnChange(replaceCellStateAction(cellId, cell));
    };

    const selectCell: JupyterEditorStateActions['selectCell'] = (cellId) => {
        setState(selectCellStateAction(cellId));
    };

    const editCell: JupyterEditorStateActions['editCell'] = (cellId, cell) => {
        setStateOnChange(editCellStateAction(cellId, cell));
    };

    const executeCell: JupyterEditorStateActions['executeCell'] = (cellId, onDone) => {
        if (!kernel.kernel){                        
            enqueueSnackbar("No kernel, start kernel first!",{ variant: 'error' })
            return;            
        }
        if (state.executing) return;
        const cell = state.contents.cells.find((cell) => cell.id === cellId);
        if (!cell) return;
        const source = Array.isArray(cell.source) ? joinSource(cell.source) : cell.source;

        setState(executeCellInitStateAction(cellId));

        const actionStartTime = Date.now();
        const iFuture = kernel.execute(source);
        if (!iFuture) return;

        let outputCollector: IOutput[] = [];
        let execution_count: number | null = null;

        iFuture.done.then((value) => {
            const executionTime = Date.now() - actionStartTime;
            setState(executeCellDoneStateAction(cellId, execution_count, executionTime));
            onDone?.();
        });
        iFuture.onReply = (msg) => {
            const counted = msg?.content?.execution_count;
            if (typeof counted === 'number') {
                execution_count = counted;
            }
            if (KernelMessage.isInputRequestMsg(msg)) {
                // TODO
            }
        };
        iFuture.onIOPub = (msg) => {
            if (KernelMessage.isStreamMsg(msg)) {
                const output = fromKernelStreamMessage(msg);
                outputCollector.push(output);
                setState(executeCellAddOutputStateAction(cellId, output));
            } else if (KernelMessage.isDisplayDataMsg(msg)) {
                const output = fromKernelDisplayDataMessage(msg);
                outputCollector.push(output);
                setState(executeCellAddOutputStateAction(cellId, output));
            } else if (KernelMessage.isErrorMsg(msg)) {
                const output = fromKernelErrorMessage(msg);
                outputCollector.push(output);
                setState(executeCellAddOutputStateAction(cellId, output));
            } else if (KernelMessage.isExecuteResultMsg(msg)) {
                execution_count = msg.content.execution_count;
                const output = fromKernelExecuteResultMessage(msg);
                setState(executeCellAddOutputStateAction(cellId, output));
            } else if (KernelMessage.isExecuteInputMsg(msg)) {
                execution_count = msg.content.execution_count;
            } else if (KernelMessage.isClearOutputMsg(msg)) {
                setState(clearCellOutputsStateAction(cellId));
            }
        };
    };

    const executeAll = () => {        
        if (!kernel.kernel){
            enqueueSnackbar("No kernel, start kernel first!",{ variant: 'error' });
            return; 
        }
        const cellIds = state.contents.cells.filter((cell) => cell.cell_type === 'code').map((cell) => String(cell.id));

        setState(executeAllCellsInitStateAction());

        const run = (index: number) => {
            const cellId = cellIds[index];
            if (!cellId) {
                // final item
                setState(executeAllCellsEndStateAction());
                return;
            }

            executeCell(cellId, () => run(index + 1));
        };

        run(0);
    };

    const addCell: JupyterEditorStateActions['addCell'] = (
        cell: ICell,
        afterCellId: string | null,
        position?: 'before' | 'after'
    ) => {
        setStateOnChange(addCellStateAction(cell, afterCellId, position));
    };

    const addNewCell: JupyterEditorStateActions['addNewCell'] = (cellId, cellType) => {
        const cell = generateCell(cellType || state.cellType);

        addCell(cell, cellId || null);
    };

    const removeCell: JupyterEditorStateActions['removeCell'] = useCallback((cellId) => {
        setStateOnChange(removeCellStateAction(cellId));
    }, []);

    const duplicateCell: JupyterEditorStateActions['duplicateCell'] = useCallback((cellId: string) => {
        setStateOnChange(duplicateCellStateAction(cellId));
    }, []);

    const swapCell = useCallback((fromCellId: string, toCellId: string) => {
        setStateOnChange(swapCellStateAction(fromCellId, toCellId));
    }, []);

    const moveCellUp: JupyterEditorStateActions['moveCellUp'] = (cellId) => {
        setStateOnChange(moveCellUpStateAction(cellId));
    };

    const moveCellDown: JupyterEditorStateActions['moveCellDown'] = (cellId) => {
        setStateOnChange(moveCellDownStateAction(cellId));
    };

    const clearAllOutputs: JupyterEditorStateActions['clearAllOutputs'] = () => {
        setState(clearAllCellsOutputsStateAction());
    };

    const setSettings: JupyterEditorStateActions['setSettings'] = (settings) => {
        setState(setSettingsJupyterStateAction(settings));
    };

    return {
        state,
        actions: {
            saveContents,
            setEditMode,
            setCellType,
            replaceCell,
            selectCell,
            editCell,
            executeCell,
            executeAll,
            addCell,
            addNewCell,
            removeCell,
            duplicateCell,
            swapCell,
            moveCellUp,
            moveCellDown,
            clearAllOutputs,
            setSettings,
        },
    };
}
