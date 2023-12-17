import { ComponentType } from 'react';
import { useJupyterEditorContext } from '../context';
import { Grid } from '@mui/material';
import { CellRaw } from './Cells/CellRaw';
import { CellMarkdown } from './Cells/CellMarkdown';
import { CellCode } from './Cells/CellCode';
import { CellType } from './types';
import { EditorCellProvider } from './EditorCellContext';

const cellTypeComponent: Record<CellType, ComponentType> = {
    raw: CellRaw,
    code: CellCode,
    markdown: CellMarkdown,
};

export function JupyterCellEditor() {
    const {
        state: { contents },
    } = useJupyterEditorContext();

    const cells = contents?.cells || [];

    return (
        <Grid container flexDirection={'column'} gap={1} width={'100%'}>
            {cells?.map((cell) => {
                const CellComponent = cellTypeComponent[cell.cell_type];

                const cellId = typeof cell.id === 'string' ? cell.id : String(cell.id);

                return (
                    <EditorCellProvider key={cellId} cell={cell}>
                        <CellComponent key={cellId} />
                    </EditorCellProvider>
                );
            })}
        </Grid>
    );
}
