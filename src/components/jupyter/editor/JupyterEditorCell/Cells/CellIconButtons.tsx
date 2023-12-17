import { IconButton, Tooltip } from '@mui/material';
import Iconify from '../../../../iconify';
import { useEditorCell } from '../EditorCellContext';

export function ExecuteCellIconButton({ onExecuteClick }: { onExecuteClick: () => void }) {
    const { isLoading } = useEditorCell();

    return (
        <Tooltip title={'Execute cell content in current session.'}>
            <IconButton onClick={onExecuteClick} size={'small'} disabled={isLoading}>
                <Iconify icon="bx:play" />
            </IconButton>
        </Tooltip>
    );
}

export function DuplicateCellIconButton() {
    const { duplicateCell, isLoading } = useEditorCell();

    return (
        <IconButton size={'xsmall'} onClick={duplicateCell} disabled={isLoading}>
            <Iconify icon="bx:duplicate" />
        </IconButton>
    );
}

export function MoveCellUpIconButton() {
    const { moveUp, isLoading } = useEditorCell();

    return (
        <IconButton size={'xsmall'} onClick={moveUp} disabled={isLoading}>
            <Iconify icon="bx:chevron-up" />
        </IconButton>
    );
}

export function MoveCellDownIconButton() {
    const { moveDown, isLoading } = useEditorCell();

    return (
        <IconButton size={'xsmall'} onClick={moveDown} disabled={isLoading}>
            <Iconify icon="bx:chevron-down" />
        </IconButton>
    );
}

export function DeleteCellIconButton() {
    const { deleteCell, isLoading } = useEditorCell();

    return (
        <IconButton size={'xsmall'} onClick={deleteCell} disabled={isLoading}>
            <Iconify icon="bx:trash" />
        </IconButton>
    );
}
