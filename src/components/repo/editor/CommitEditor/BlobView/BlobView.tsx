import React from 'react';
import { useCommitEditorContext } from '../CommitEditorContext';
import { FileExtension, FileSchemaType } from '../types';
import dynamic from 'next/dynamic';
import CodeBlobView from './views/CodeBlobView';
import MarkdownBlobView from './views/MarkdownBlobView';
import SimulationBlobView from './views/SimulationBlobView';
import ParameterSetupBlobView from './views/ParameterSetupBlobView';
import { BlobViewLoader } from './BlobViewLoader';

const JupyterBlobView = dynamic(() => import('./views/JupyterBlobView'), {
    ssr: false,
    loading: (loadingProps) => <BlobViewLoader />,
});

export function BlobView() {
    const {
        fileRoute: { fileType, schemaType },
    } = useCommitEditorContext();

    if (fileType == FileExtension.TEXT) {
        return <CodeBlobView />;
    }

    if (fileType == FileExtension.MARKDOWN) {
        return <MarkdownBlobView />;
    }

    if (fileType == FileExtension.NOTEBOOK) {
        return <JupyterBlobView />;
    }

    if (fileType == FileExtension.PYTHON) {
        return <CodeBlobView />;
    }

    if (fileType == FileExtension.JSON) {
        if (schemaType == FileSchemaType.SIMULATIONS) {
            return <SimulationBlobView />;
        }
        if (schemaType == FileSchemaType.PARAMETER_SETUPS) {
            return <ParameterSetupBlobView />;
        }
    }

    console.log('ERROR, unsupported file type', fileType, schemaType);
    return <CodeBlobView />;
}
