import { CellType, ICell, ICodeCell, IMarkdownCell, IRawCell } from '@jupyterlab/nbformat';
import { uuid } from '@jupyter-widgets/base';

export function generateCellId(): string {
    return uuid();
}

export function generateCell(cellType: CellType): ICell {
    if (cellType === 'markdown') {
        return {
            id: generateCellId(),
            cell_type: 'markdown',
            source: '',
            metadata: {},
        } as IMarkdownCell;
    } else if (cellType === 'code') {
        return {
            id: generateCellId(),
            cell_type: 'code',
            source: '',
            execution_count: null,
            outputs: [],
            metadata: {},
        } as ICodeCell;
    } else {
        return {
            id: generateCellId(),
            cell_type: 'raw',
            source: '',
            metadata: {},
        } as IRawCell;
    }
}

export function insert<T = any>(arr: T[], index: number, newItem: T): T[] {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
}

export function moveArrayItem<T = any>(array: T[], fromIndex: number, toIndex: number): T[] {
    // bounded index
    const destIndex = Math.min(Math.max(toIndex, 0), array.length - 1);

    const item = array[fromIndex];
    const item2 = array[destIndex];

    if (fromIndex === destIndex || !item || !item2) {
        return array;
    }

    const copy = [...array];
    copy[destIndex] = item;
    copy[fromIndex] = item2;

    return copy;
}

export function throttleFunction<T extends (...args: any[]) => void>(func: T, delay: number = 400): T {
    let timeout: any;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    }) as T;
}


export function joinSource(source: string[]) : string {
    return source.join('');
}