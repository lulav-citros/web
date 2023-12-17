import { IMarkdownCell } from '@jupyterlab/nbformat';
import { useJupyterEditorContext } from '../../context';
import { CellLayout } from './CellLayout';
import { Box, ClickAwayListener } from '@mui/material';
import { CodeEditor } from '../../../../monaco';
import Markdown from '../../../../markdown';
import { useEditorCell } from '../EditorCellContext';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useCellScrollTo } from '../UseCellScrollTo';
import { joinSource } from 'src/components/jupyter/utils';

export function CellMarkdown() {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const {
        state: { saving },
    } = useJupyterEditorContext();
    const { cell, isEditing, isSelected, selectCell, editSource, setCellEditMode } = useEditorCell<IMarkdownCell>();

    const source = cell.source instanceof Array ? joinSource(cell.source) : cell.source;

    const handleSaveSource = () => {
        setCellEditMode(false);
    };

    useCellScrollTo(ref);

    return (
        <CellLayout ref={ref} onEditClick={() => setCellEditMode(true)} isEditing={isEditing} onSave={handleSaveSource}>
            {isEditing ? (
                <ClickAwayListener onClickAway={handleSaveSource}>
                    <Box
                        sx={{
                            border: `1px solid ${
                                isSelected
                                    ? theme.palette.mode === 'dark'
                                        ? theme.palette.grey[600]
                                        : theme.palette.grey[200]
                                    : 'transparent'
                            }`,
                            p: 0,
                        }}
                    >
                        <CodeEditor
                            defaultLanguage={'markdown'}
                            initialValue={source}
                            onChange={editSource}
                            readOnly={saving}
                            onBlur={handleSaveSource}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectCell();
                            }}
                        />
                    </Box>
                </ClickAwayListener>
            ) : (
                <Box
                    minHeight={20}
                    width={'100%'}
                    onDoubleClick={(event) => {
                        event.stopPropagation();
                        setCellEditMode(true);
                    }}
                >
                    <Markdown data={source} />
                </Box>
            )}
        </CellLayout>
    );
}
