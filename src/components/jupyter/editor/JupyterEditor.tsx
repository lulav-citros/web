import React from 'react';
import { Grid } from '@mui/material';
import { JupyterEditorState } from './context';
import { KernelContext } from '../kernel';
import { JupyterEditorError } from './JupyterEditorError';
import { StickyNavWrapper } from '../../sticky-nav';
import { JupyterEditorToolbar } from './JupyterEditorToolbar';
import { JupyterLoaderIndicator } from './JupyterLoaderIndicator';
import { JupyterCellEditor } from './JupyterEditorCell';
import { INotebookContent } from '@jupyterlab/nbformat';
import { useCitrosMonacoTheme } from '../../monaco';
import { ServerConnection } from '@jupyterlab/services';

// @jupyter lib styles
import '@lumino/widgets/style/index.css';
import '@lumino/dragdrop/style/index.css';

// plugins
import 'jupyter-matplotlib/css/mpl_widget.css';

import '@jupyterlab/ui-components/style/base.css';
import '@jupyterlab/ui-components/lib/icon/iconimports';
import '@jupyterlab/ui-components/style/icons.css';
import '@jupyterlab/ui-components/style/iconsalt.css';
import '@jupyterlab/ui-components/style/iconshover.css';
import '@jupyterlab/apputils/style/base.css';
import '@jupyterlab/rendermime/style/base.css';
import '@jupyterlab/codeeditor/style/base.css';
import '@jupyterlab/documentsearch/style/base.css';
import '@jupyterlab/outputarea/style/base.css';
import '@jupyterlab/console/style/base.css';
import '@jupyterlab/completer/style/base.css';
import '@jupyterlab/codemirror/style/base.css';
import '@jupyterlab/cells/style/base.css';
import '@jupyterlab/notebook/style/base.css';
import '@jupyterlab/filebrowser/style/base.css';
import '@jupyterlab/terminal/style/index.css';
import '@jupyter-widgets/base/css/index.css';
import '@jupyter-widgets/controls/css/widgets-base.css';
import '@jupyter-widgets/controls/css/widgets.css';
import '@jupyter-widgets/controls/css/lumino.css';
import '@jupyter-widgets/controls/css/materialcolors.css';
import '@jupyterlab/theme-dark-extension/style/theme.css';
import '@jupyterlab/theme-dark-extension/style/variables.css';
import { JupyterProvider } from './JupyterProvider';
// import '@jupyter-widgets/controls/css/labvariables.css';
// import '@jupyter-widgets/controls/css/widgets.built.css';

/**
 * JupyterEditorProps
 * Main jupyter editor interface
 */
export interface JupyterEditorProps {
    /**
     * readonly state
     */
    readonly?: boolean;
    /**
     * storage key / cache
     */
    notebookId: string;
    /**
     * jupyter server kernel identity
     */
    username: string;
    /**
     * initial editor state or manual set
     */
    initialState?: Partial<JupyterEditorState>;
    /**
     * notebook contents
     */
    notebook?: INotebookContent;
    /**
     * object env to set on initial kernel load
     */
    kernelContext?: KernelContext;
    /**
     * onSave click
     */
    onSave: (notebook: INotebookContent) => void;
    /**
     * onChange happened to text of notebook (output change too)
     */
    onChange?: (notebook: INotebookContent) => void;
    /**
     * Connection settings for jupyter API client
     */
    serverSettings?: Partial<ServerConnection.ISettings>;
}

export function JupyterEditor(props: JupyterEditorProps) {
    // TODO move to outer usage
    useCitrosMonacoTheme();

    return (
        <JupyterProvider {...props}>
            <Grid
                container
                flexDirection={'column'}
                gap={0}
                position={'relative'}
                alignItems={'stretch'}
                flexShrink={0}
                width={'100%'}
                minHeight={'40vh'}
            >
                <JupyterEditorError />
                <Grid item mb={2}>
                    <StickyNavWrapper topOffset={0}>
                        <JupyterEditorToolbar />
                    </StickyNavWrapper>
                </Grid>

                <JupyterCellEditor />
                <JupyterLoaderIndicator />
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        position: 'absolute',*/}
                {/*        bottom: 0,*/}
                {/*        height: 400,*/}
                {/*        width: 800,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <TerminalComponent />*/}
                {/*</Box>*/}
            </Grid>
        </JupyterProvider>
    );
}
