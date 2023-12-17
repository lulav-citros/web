import { PropsWithChildren, useEffect, useRef } from 'react';
import { useMonaco } from '@monaco-editor/react';

export function MonacoColorize({ children, lang }: PropsWithChildren<{ lang?: string }>) {
    const viewRef = useRef<any>(null);

    const monaco = useMonaco();

    useEffect(() => {
        if (!viewRef.current) return;
        monaco?.editor.colorizeElement(viewRef.current, { mimeType: lang || 'python', theme: 'citros' });
    }, [monaco]);

    return <code ref={viewRef}>{children}</code>;
}
