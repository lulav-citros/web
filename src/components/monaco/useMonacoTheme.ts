import { useTheme } from '@mui/material/styles';
import { useMonaco } from '@monaco-editor/react';
import Color from 'color';
import { useEffect } from 'react';
import { MONACO_CITROS_THEME_DARK } from './consts';
import { addLogLanguage } from './languages';

/**
 * Use once at application root
 */
export function useCitrosMonacoTheme() {
    const theme = useTheme();

    const monaco = useMonaco();
    monaco?.editor.defineTheme(MONACO_CITROS_THEME_DARK, {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // {
            //     background: Color(theme.palette.background.neutral).hex(),
            //     token: '',
            // },
            // {
            //     foreground: 'c41a16',
            //     token: 'string',
            // },
            // {
            //     foreground: '1c00cf',
            //     token: 'constant.numeric',
            // },
            // {
            //     foreground: 'aa0d91',
            //     token: 'keyword',
            // },
            // {
            //     foreground: '000000',
            //     token: 'keyword.operator',
            // },
            // {
            //     foreground: 'aa0d91',
            //     token: 'constant.language',
            // },
            // {
            //     foreground: '990000',
            //     token: 'support.class.exception',
            // },
            // {
            //     foreground: '000000',
            //     token: 'entity.name.function',
            // },
            // {
            //     fontStyle: 'bold underline',
            //     token: 'entity.name.type',
            // },
            // {
            //     fontStyle: 'italic',
            //     token: 'variable.parameter',
            // },
            // {
            //     foreground: '007400',
            //     token: 'comment',
            // },
            // {
            //     foreground: 'ff0000',
            //     token: 'invalid',
            // },
            // {
            //     background: 'e71a1100',
            //     token: 'invalid.deprecated.trailing-whitespace',
            // },
            // {
            //     foreground: '000000',
            //     background: 'fafafafc',
            //     token: 'text source',
            // },
            // {
            //     foreground: 'aa0d91',
            //     token: 'meta.tag',
            // },
            // {
            //     foreground: 'aa0d91',
            //     token: 'declaration.tag',
            // },
            // {
            //     foreground: '000000',
            //     fontStyle: 'bold',
            //     token: 'support',
            // },
            // {
            //     foreground: 'aa0d91',
            //     token: 'storage',
            // },
            // {
            //     fontStyle: 'bold underline',
            //     token: 'entity.name.section',
            // },
            // {
            //     foreground: '000000',
            //     fontStyle: 'bold',
            //     token: 'entity.name.function.frame',
            // },
            // {
            //     foreground: '333333',
            //     token: 'meta.tag.preprocessor.xml',
            // },
            // {
            //     foreground: '994500',
            //     fontStyle: 'italic',
            //     token: 'entity.other.attribute-name',
            // },
            // {
            //     foreground: '881280',
            //     token: 'entity.name.tag',
            // },
        ],
        colors: {
            'editor.foreground': Color(theme.palette.background.neutral).hex(),
            'editor.background': Color(theme.palette.background.default).hex(),
            // 'editor.selectionBackground': '#BAD6FD',
            // 'editor.selectionBackground': '#FFFFFF',
            // 'editor.lineHighlightBackground': '#0000001A',
            // 'editorCursor.foreground': '#000000',
            // 'editorWhitespace.foreground': '#B3B3B3F4',
            // 'editor.inactiveSelectionBackground': '#fafafa',
            // 'editor.selectionHighlight': '#fafafa',
            // 'editor.selectionBackground': '#fafafa',
            // 'editor.lineHighlightBackground': '#fafafa',
            // 'editor.lineHighlight': '#fafafa',
            // 'editor.highlightBackground': '#fafafa',

            // 'editor.inactiveSelection': '#E5EBF1',
            'editor.indentGuidesBackground': '#fafafa',
            // 'editor.selectionHighlight': '#fafafa',
        },
    });
    useEffect(() => {
        if (!monaco) return;
        addLogLanguage(monaco);
    }, [monaco?.editor]);
}
