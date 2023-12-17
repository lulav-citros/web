import { useJupyterElements } from '../../context';
import { useEffect, useMemo } from 'react';
import { OutputArea, OutputAreaModel } from '@jupyterlab/outputarea';
import Lumino from '../../../lumino/Lumino';
import { Box } from '@mui/material';
import { IOutput } from '@jupyterlab/nbformat';

interface CellCodeOutputProps {
    outputs: IOutput[];
}

export function CellCodeOutput({ outputs }: CellCodeOutputProps) {
    const {
        services: { renderMimeRegistry },
    } = useJupyterElements();

    const asd = useMemo(() => new OutputAreaModel({ values: outputs || [] }), []);

    useEffect(() => {
        asd.fromJSON(outputs);
    }, [outputs]);

    const widget = useMemo(
        () =>
            renderMimeRegistry ? (
                <Lumino>
                    {
                        new OutputArea({
                            rendermime: renderMimeRegistry,
                            model: asd,
                        })
                    }
                </Lumino>
            ) : null,
        [renderMimeRegistry]
    );

    return (
        <Box
            sx={{
                flexDirection: 'column',
                overflowX: 'auto',
                py: 2,
                mb: outputs.length ? 2 : 0,
            }}
        >
            {widget}
        </Box>
    );
}
