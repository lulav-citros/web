import { FC, useEffect, useMemo, useRef } from 'react';
import MonacoEditor, { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { useTheme } from '@mui/material/styles';
import { editor } from 'monaco-editor';
import { Box } from '@mui/material';
import { MONACO_CITROS_THEME_DARK, MONACO_CITROS_THEME_LIGHT } from './consts';
import { useCitrosMonacoTheme } from './useMonacoTheme';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export const options: MonacoEditorProps['options'] = {
    minimap: { enabled: false },
    overviewRulerLanes: 0,
    scrollbar: {
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        vertical: 'hidden',
        horizontal: 'hidden',
        handleMouseWheel: false,
        alwaysConsumeMouseWheel: false,
        scrollByPage: false,
    },
    scrollBeyondLastLine: false,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    acceptSuggestionOnEnter: 'off',
    codeLens: false,
    lineNumbers: 'on',
};

interface CodeEditorProps {
    value?: string;
    initialValue?: string;
    onChange: (value: string) => void;
    onClick?: (e: MouseEvent) => void;
    onBlur?: () => void;
    readOnly?: boolean;
    defaultLanguage?: string;
    editorMinHeight?: number;
    fontSize?: number;
}

export const CodeEditor: FC<CodeEditorProps> = ({
    value,
    initialValue,
    onChange,
    onClick,
    onBlur,
    readOnly,
    defaultLanguage,
    editorMinHeight = 32,
    fontSize = 12,
}) => {
    const theme = useTheme();
    const editorRef = useRef<IStandaloneCodeEditor | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useCitrosMonacoTheme();

    useEffect(() => {
        if (onBlur) editorRef.current?.onDidBlurEditorText(onBlur);
    }, [onBlur]);

    const updateHeight = () => {
        const container = containerRef.current;
        const editor = editorRef.current;
        if (!container || !editor) return;

        const contentHeight = Math.max(editorMinHeight, editor.getContentHeight() || 0);
        container.style.height = `${contentHeight}px`;
    };

    return (
        <Box ref={containerRef} sx={{ width: '99.5%' }}>
            <MonacoEditor
                defaultLanguage={defaultLanguage || 'python'}
                theme={theme.palette.mode === 'dark' ? MONACO_CITROS_THEME_DARK : MONACO_CITROS_THEME_LIGHT}
                defaultValue={initialValue}
                value={value}
                options={useMemo(() => {
                    return {
                        ...options,
                        readOnly,
                        fontSize: fontSize,
                        padding: {
                            top: theme.spacing(3) as unknown as number,
                            bottom: theme.spacing(3) as unknown as number,
                        },
                        scrollbar: {
                            vertical: 'hidden',
                            horizontal: 'auto',
                            handleMouseWheel: true,
                            alwaysConsumeMouseWheel: false,
                        },
                    };
                }, [readOnly])}
                wrapperProps={{
                    onClick,
                }}
                onChange={(value, ev) => {
                    onChange(value || '');
                }}
                onMount={(editor, monaco) => {
                    editor.onDidContentSizeChange(updateHeight);
                    editorRef.current = editor;
                    updateHeight();
                }}
            />
        </Box>
    );
};
