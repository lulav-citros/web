import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useKernelManager } from '../../kernel';
import { RenderMimeRegistry, standardRendererFactories } from '@jupyterlab/rendermime';
import { KernelWidgetManager, WidgetRenderer } from '@jupyter-widgets/jupyterlab-manager';
import { getImportExportMap } from '../JupyterEditorCell/Cells/CellOutput/utils';
import { LabWidgetManager, WIDGET_VIEW_MIMETYPE } from '@jupyter-widgets/jupyterlab-manager/lib/manager';
import * as base from '@jupyter-widgets/base';
import * as output from '@jupyter-widgets/output';
import * as controls from '@jupyter-widgets/controls';
// @ts-ignore
import * as matplotlib from 'jupyter-matplotlib';

export interface JupyterElementsContextType {
    services: {
        // One instance to pass through all widget renders
        renderMimeRegistry: RenderMimeRegistry;
        // has KernelWidgetmManager and Widgetmanager from @jupyter-widgets/jupyterlab-manager
        widgetManager?: LabWidgetManager;
    };
}

export const JupyterElementsContext = createContext<JupyterElementsContextType>({} as JupyterElementsContextType);

export function JupyterElementsContextProvider({ children }: PropsWithChildren) {
    const { kernel } = useKernelManager();

    const renderMimeRegistry = useMemo(
        () => new RenderMimeRegistry({ initialFactories: [...standardRendererFactories] }),
        []
    );

    const widgetManager = useMemo(() => {
        if (!kernel) return undefined;

        // @ts-ignore
        const widgetManager = new KernelWidgetManager(kernel, renderMimeRegistry);

        widgetManager.register({
            name: '@jupyter-widgets/base',
            version: base.JUPYTER_WIDGETS_VERSION,
            exports: getImportExportMap(base),
        });

        widgetManager.register({
            name: '@jupyter-widgets/output',
            version: output.OUTPUT_WIDGET_VERSION,
            exports: getImportExportMap(output),
        });

        widgetManager.register({
            name: '@jupyter-widgets/controls',
            version: controls.JUPYTER_CONTROLS_VERSION,
            exports: getImportExportMap(controls),
        });

        widgetManager.register({
            name: matplotlib.MODULE_NAME,
            version: matplotlib.MODULE_VERSION,
            exports: getImportExportMap(matplotlib),
        });

        renderMimeRegistry.addFactory({
            safe: true,
            mimeTypes: [WIDGET_VIEW_MIMETYPE],
            defaultRank: 1,
            // @ts-ignore
            createRenderer: (options) => {
                return new WidgetRenderer(options, widgetManager);
            },
        });

        return widgetManager;
    }, [kernel]);

    return (
        <JupyterElementsContext.Provider
            value={{
                services: {
                    renderMimeRegistry,
                    widgetManager,
                },
            }}
        >
            {children}
        </JupyterElementsContext.Provider>
    );
}

export function useJupyterElements() {
    return useContext(JupyterElementsContext);
}
