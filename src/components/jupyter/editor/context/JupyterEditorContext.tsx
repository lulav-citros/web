import { createContext, PropsWithChildren, ReactElement, useContext, useMemo } from 'react';
import { useKernelManager } from '../../kernel';
import { EMPTY_NOTEBOOK_CONTENT, JupyterEditorProps } from '../index';
import { JupyterEditorContextType } from './types';
import { useJupyterEditorState } from './UseJupyterEditorState';
import { compareChangeSource } from '../../notebookMapper';

export const JupyterEditorContext = createContext<JupyterEditorContextType>({} as JupyterEditorContextType);

export interface JupyterEditorContextProviderProps extends JupyterEditorProps {}

export const JupyterEditorContextProvider = ({
    children,
    notebook = EMPTY_NOTEBOOK_CONTENT,
    onSave,
    onChange,
    initialState,
    readonly,
}: PropsWithChildren<JupyterEditorContextProviderProps>): ReactElement => {
    const kernel = useKernelManager();

    const config = useMemo(
        () => ({
            readonly: Boolean(readonly),
        }),
        [readonly]
    );

    const { state, actions } = useJupyterEditorState({
        notebook,
        initialState,
        onSave,
        onChange,
        kernel,
    });

    const changeIndicator = useMemo(() => compareChangeSource(state.contents, notebook), [state.contents, notebook]);

    return (
        <JupyterEditorContext.Provider
            value={{
                config,
                state,
                changeIndicator,
                actions,
            }}
        >
            {children}
        </JupyterEditorContext.Provider>
    );
};

export const useJupyterEditorContext = () => {
    return useContext(JupyterEditorContext);
};
