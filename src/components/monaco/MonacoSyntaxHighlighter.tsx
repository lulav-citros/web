import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Monaco, useMonaco } from '@monaco-editor/react';

export const MonacoSyntaxHighlighter: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLPreElement>(null);
    const monaco: Monaco | null = useMonaco();

    useEffect(() => {
        if (ref.current && monaco) {
            // monaco.editor.colorizeElement(ref.current);
        }
    }, [monaco, ref]);

    return (
        <div style={{ background: '#2f2f2f' }}>
            <code ref={ref} lang={'python'}>
                {children}
            </code>
        </div>
    );
};
