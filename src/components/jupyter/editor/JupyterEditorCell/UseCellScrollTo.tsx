import { useEditorCell } from './EditorCellContext';
import { ICell } from '@jupyterlab/nbformat';
import { useEffect } from 'react';
import { useJupyterEditorContext } from '../context';

export function useCellScrollTo(ref: React.MutableRefObject<HTMLDivElement | null>) {
    const { isSelected } = useEditorCell<ICell>();
    const {
        state: {
            settings: { autoScroll },
        },
    } = useJupyterEditorContext();

    useEffect(() => {
        const element = ref.current;
        if (!autoScroll || !element || !isSelected) return;

        window.scrollTo({
            behavior: 'smooth',
            top: (element?.offsetTop || 0) + 80,
        });
    }, [isSelected, autoScroll]);
}
