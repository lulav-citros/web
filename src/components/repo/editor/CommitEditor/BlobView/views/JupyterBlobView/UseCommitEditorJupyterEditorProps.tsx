import React, { useMemo } from 'react';
import { CommitEditorContextType } from '../../../CommitEditorContext';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import { JUPYTER_CONFIG } from 'src/config';
import { INotebookContent } from '@jupyterlab/nbformat';
import { JupyterEditorProps } from '../../../../../../jupyter/editor';
import { validateJupyterNotebookFile } from './utils';
import { md5 } from '@mui/x-license-pro/encoding/md5';

function getNotebookId(fileKey: string = '') {
    return md5(fileKey);
}

function safeJsonParse(data: string) {
    try {
        return JSON.parse(data);
    } catch (e) {}
}

export function useCommitEditorJupyterEditorProps(commitEditorContext: CommitEditorContextType): JupyterEditorProps {
    const {
        fileKey,
        fileRoute: {repoName},
        state: { fileDataInitial, viewMode, isEditing },
        actions: { setFileData, commit },
    } = commitEditorContext;
    const { query } = useRouter();

    const { ...params } = query;

    const { user, accessToken } = useAuthContext();

    // TODO: fix, doesnt work on kernel restart!!!
    //  Need to add to jupyter kernel editor
    const kernelContext = useMemo(() => {
        let defaultContext = {
            PG_USER: user.id, //user.organization.slug + '-' + user.firstName + '-' + user.lastName,
            PG_PASSWORD: user.id,
            PG_DATABASE: user.organization.slug,
            PG_HOST: JUPYTER_CONFIG.referrer as string,
            CITROS_DOMAIN: JUPYTER_CONFIG.referrer as string,
            // CITROS_BATCH_ID: '',
            // CITROS_SIMULATION_RUN_ID: '',
            CITROS_REPO: repoName,
            ...params,
        };

        return defaultContext;
    }, [user, params]);

    const notebook = useMemo(() => {
        // TODO remove due to protective coding
        const awesome = fileDataInitial ? safeJsonParse(fileDataInitial) : undefined;
        return validateJupyterNotebookFile(awesome) ? awesome : undefined;
    }, [fileDataInitial, fileKey]);

    const serverSettings: JupyterEditorProps['serverSettings'] = useMemo(
        () => ({
            wsUrl: JUPYTER_CONFIG.wssUrl,
            appendToken: false,
            init: {
                mode: 'cors',
                referrer: JUPYTER_CONFIG.referrer ?? window.location.host,
                headers: {
                    ...(accessToken
                        ? {
                              Authorization: 'Bearer ' + accessToken,
                          }
                        : {}),
                },
            },
        }),
        [accessToken]
    );

    const readonly = !isEditing;

    return useMemo(
        () => ({
            readonly,
            notebookId: getNotebookId(fileKey),
            username: user.email,
            onSave: (notebook) => {
                // commit(clearNotebookOutputs(notebook));
            },
            onChange: (notebook1) => {
                setFileData(JSON.stringify(notebook1));
            },
            notebook,
            kernelContext: kernelContext,
            serverSettings,
        }),
        [serverSettings, fileKey, setFileData, readonly, notebook]
    );
}
