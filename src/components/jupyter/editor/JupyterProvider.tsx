import React, { PropsWithChildren } from 'react';
import { KernelManageProvider } from '../kernel';
import { JupyterEditorContextProvider, JupyterElementsContextProvider } from './context';
import { JupyterEditorProps } from './JupyterEditor';

export function JupyterProvider({
    readonly,
    notebookId,
    username,
    notebook,
    onSave,
    onChange,
    initialState,
    kernelContext,
    serverSettings,
    children,
}: PropsWithChildren<JupyterEditorProps>) {
    return (
        <KernelManageProvider
            notebookId={notebookId}
            username={username}
            kernelContext={kernelContext}
            serverSettings={serverSettings}
        >
            <JupyterElementsContextProvider>
                <JupyterEditorContextProvider
                    readonly={readonly}
                    notebookId={notebookId}
                    username={username}
                    initialState={initialState}
                    notebook={notebook}
                    kernelContext={kernelContext}
                    onSave={onSave}
                    onChange={onChange}
                >
                    {children}
                </JupyterEditorContextProvider>
            </JupyterElementsContextProvider>
        </KernelManageProvider>
    );
}
