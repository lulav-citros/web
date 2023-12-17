import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { Kernel, KernelConnection, KernelSpec, ServerConnection } from '@jupyterlab/services';
import { createKernel, getKernel, getKernelSpecs } from '../jupyterApiClient';
import { executeKernelContext, extractDefaultSpecName } from './kernel.util';
import { KernelContext } from './kernel.types';
import { throttleFunction } from '../utils';

const CITROS_KERNEL_ID_KEY = 'CITROS_KERNEL_ID';

export interface KernelManageContextType {
    loading: Partial<{
        kernelSpec: boolean;
        kernel: boolean;
    }>;
    kernel?: Kernel.IKernelConnection;
    status: Kernel.Status;
    connectionStatus: Kernel.ConnectionStatus;
    error?: string;
    kernelsSpec?: KernelSpec.ISpecModels;
    setDefaultKernelSpec: (kernelName: string) => void;
    load: () => void;
    unload: () => void;
    execute: (code: string) => Kernel.IFuture<any, any> | null;
    restart: () => void;
    interrupt: () => void;
    reconnect: () => void;
    shutdown: () => void;
}

export function useKernelManager() {
    return useContext(KernelManageContext);
}

const KernelManageContext = createContext<KernelManageContextType>({} as KernelManageContextType);

export interface KernelManageProviderProps {
    /**
     * storage key / cache
     */
    notebookId: string;
    /**
     * jupyter server identifier
     */
    username: string;
    /**
     * kernel init parameters set in code context
     */
    kernelContext?: KernelContext;
    /**
     * kernel api client server options (memoized)
     */
    serverSettings?: Partial<ServerConnection.ISettings>;
}

function generateKernelIdLocalStorageKey(notebookId: string) {
    return `${CITROS_KERNEL_ID_KEY}_${notebookId}`;
}

function getOrCreateKernelModel(notebookId: string, kernelName: string): Promise<Kernel.IModel> {
    const localKernelId = localStorage.getItem(generateKernelIdLocalStorageKey(notebookId));

    if (!localKernelId) {
        return createKernel(kernelName, notebookId).then((value) => {
            localStorage.setItem(generateKernelIdLocalStorageKey(notebookId), value.id);
            return value;
        });
    }
    return getKernel(localKernelId)
        .then((value) => (!value ? createKernel(kernelName, notebookId) : value))
        .then((value) => {
            localStorage.setItem(generateKernelIdLocalStorageKey(notebookId), value.id);
            return value;
        });
}

export interface KernelManageProviderState {
    loading: Partial<{
        kernelSpec: boolean;
        kernel: boolean;
    }>;
    error?: string;

    // kernelspec
    kernelsSpec?: KernelSpec.ISpecModels;

    // kernel
    kernel?: KernelConnection;
    kernelId?: string;
    status: Kernel.Status;
    connectionStatus: Kernel.ConnectionStatus;
}

const kernelMap: Record<string, KernelConnection> = {};

export function KernelManageProvider({
    notebookId,
    username,
    kernelContext,
    serverSettings,
    children,
}: PropsWithChildren<KernelManageProviderProps>) {
    const [state, setState] = useState<KernelManageProviderState>({
        loading: {
            kernelSpec: true,
            kernel: false,
        },
        status: 'unknown',
        connectionStatus: 'disconnected',
    });

    const { kernel, kernelsSpec, status, connectionStatus, error, loading } = state;

    useEffect(() => {
        getKernelSpecs()
            .then((kernelsSpec) => {
                // localStorage.setItem(CITROS_DEFAULT_KERNELSPEC_KEY, kernelsSpec.default);
                setState((prevState) => ({
                    ...prevState,
                    kernelsSpec: {
                        ...kernelsSpec,
                        default: extractDefaultSpecName(kernelsSpec),
                    },
                    loading: {
                        ...prevState.loading,
                        kernelSpec: false,
                    },
                    error: undefined,
                }));
            })
            .catch((error) => {
                setState((prevState) => ({
                    ...prevState,
                    loading: {
                        ...prevState.loading,
                        kernelSpec: false,
                    },
                    error: error?.message || 'Unable to load kernelspecs',
                }));
            });
    }, []);

    useEffect(() => {
        if (!kernel || kernel.isDisposed) {
            return;
        }
        kernel.statusChanged.connect(statusChangeHandler);
        kernel.connectionStatusChanged.connect(connectionStatusChangeHandler);

        return () => {
            kernel.statusChanged.disconnect(statusChangeHandler);
            kernel.connectionStatusChanged.disconnect(connectionStatusChangeHandler);
        };
    }, [kernel]);

    /**
     * kernelName from
     */
    const load = useCallback(async () => {
        if (!kernelsSpec?.default || !notebookId || !username) {
            return;
        }

        let _kernel = kernelMap[notebookId];

        if (_kernel && !_kernel.isDisposed) {
            setKernelToState(_kernel);

            if (kernelContext) {
                await executeKernelContext(_kernel, kernelContext);
            }
            return;
        }

        setState((prevState) => ({
            ...prevState,
            loading: {
                ...prevState.loading,
                kernel: true,
            },
            loadingKernel: true,
        }));

        try {
            const kernelModel = await getOrCreateKernelModel(notebookId, kernelsSpec.default);

            _kernel = new KernelConnection({
                serverSettings: ServerConnection.makeSettings(serverSettings),
                model: kernelModel,
                username: username,
                clientId: notebookId,
            });

            kernelMap[notebookId] = _kernel;

            setKernelToState(_kernel);

            if (kernelContext) {
                await executeKernelContext(_kernel, kernelContext);
            }
        } catch (reason) {
            setState((prevState) => ({
                ...prevState,
                status: 'dead',
                error: reason?.message || 'Unable to connect to kernel',
                loading: { ...prevState, kernel: false },
            }));
        }
    }, [kernelsSpec?.default, notebookId, username, kernelContext, serverSettings]);

    function setKernelToState(_kernel: KernelConnection) {
        setState((prevState) => ({
            ...prevState,
            kernel: _kernel,
            kernelId: _kernel.id,
            status: _kernel.status,
            connectionStatus: _kernel.connectionStatus,
            error: undefined,
            loading: { ...prevState, kernel: false },
        }));
    }

    const unload = useCallback(() => {
        if (!kernel || kernel.isDisposed) {
            return;
        }
        kernel.dispose();
        delete kernelMap[notebookId];
    }, [kernel, notebookId]);

    const setDefaultKernelSpec = (kernelName: string) => {
        setState((prevState) => ({
            ...prevState,
            kernelsSpec: {
                ...prevState.kernelsSpec,
                default: kernelName,
            } as KernelSpec.ISpecModels,
        }));
    };

    const statusChangeHandler = useCallback(
        throttleFunction((_k: Kernel.IModel, status: Kernel.Status) => {
            setState((prevState) => ({
                ...prevState,
                status,
            }));
        }),
        []
    );

    const connectionStatusChangeHandler = useCallback(
        (_k: Kernel.IModel, connectionStatus: Kernel.ConnectionStatus) => {
            setState((prevState) => ({
                ...prevState,
                connectionStatus,
            }));
        },
        []
    );

    const execute = useCallback(
        (code: string): Kernel.IFuture<any, any> | null => {
            if (!kernel || kernel.isDisposed) {
                setState((prevState) => ({
                    ...prevState,
                    error: 'Kernel not running.',
                }));
                return null;
            }

            setState((prevState) => ({
                ...prevState,
                error: undefined,
            }));

            return kernel.requestExecute(
                {
                    code,
                },
                true,
                { username: username }
            );
        },
        [kernel, username]
    );

    const restart = useCallback(async () => {
        if (!kernel || kernel.isDisposed) return;

        setState((prevState) => ({
            ...prevState,
            error: undefined,
        }));

        try {
            await kernel.restart();

            // send context to the restarted kernel.
            if (kernelContext) {
                await executeKernelContext(kernel, kernelContext);
            }
        } catch (e) {
            setState((prevState) => ({
                ...prevState,
                kernelId: undefined,
                kernel: undefined,
                connectionStatus: 'disconnected',
                error: e?.message || 'Unable to restart kernel',
            }));
        }
    }, [kernel, load]);

    const interrupt = useCallback(async () => {
        if (!kernel || kernel.isDisposed) return;

        try {
            await kernel.interrupt();
        } catch (e) {
            setState((prevState) => ({
                ...prevState,
                kernelId: undefined,
                kernel: undefined,
                connectionStatus: 'disconnected',
                error: e?.message || 'Unable to interrupt kernel',
            }));
        }
    }, [kernel]);

    const reconnect = useCallback(async () => {
        if (!kernel || kernel.isDisposed) return;

        try {
            await kernel.reconnect();
        } catch (e) {
            setState((prevState) => ({
                ...prevState,
                kernelId: undefined,
                kernel: undefined,
                connectionStatus: 'disconnected',
                error: e?.message || 'Unable to reconnect to kernel',
            }));
        }
    }, [kernel]);

    const shutdown = useCallback(async () => {
        if (!kernel || kernel.isDisposed) {
            return;
        }

        try {
            await kernel.shutdown();
        } catch (e) {
            setState((prevState) => ({
                ...prevState,
                kernelId: undefined,
                kernel: undefined,
                connectionStatus: 'disconnected',
                error: e?.message || 'Unable to shutdown kernel',
            }));
        }
    }, [kernel]);

    return (
        <KernelManageContext.Provider
            value={{
                loading,
                kernel,
                status,
                connectionStatus,
                error,
                kernelsSpec,
                setDefaultKernelSpec,
                load,
                unload,
                execute,
                restart,
                interrupt,
                reconnect,
                shutdown,
            }}
        >
            {children}
        </KernelManageContext.Provider>
    );
}
