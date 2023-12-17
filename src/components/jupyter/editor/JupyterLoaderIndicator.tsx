import { useJupyterEditorContext } from './context/JupyterEditorContext';
import LoaderOverWidget from '../../loaderOverWidget';

export function JupyterLoaderIndicator() {
    const {
        state: { saving, fetching },
    } = useJupyterEditorContext();

    return fetching || saving ? <LoaderOverWidget /> : null;
}
