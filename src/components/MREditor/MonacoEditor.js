'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Pre-load monaco to avoid flashing
if (typeof window !== 'undefined') {
  loader.init();
}

const MonacoEditor = forwardRef(({ 
  value, 
  language, 
  onChange, 
  onSelectionChange,
  theme = 'neural-dark',
  path = '',
  loading = false 
}, ref) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    getEditor: () => editorRef.current,
    getValue: () => editorRef.current?.getValue(),
    insertText: (text) => {
      const editor = editorRef.current;
      if (!editor) return;
      
      const selection = editor.getSelection();
      const id = { major: 1, minor: 1 };
      const op = { 
          identifier: id, 
          range: selection, 
          text: text, 
          forceMoveMarkers: true 
      };
      editor.executeEdits("ai-insert", [op]);
    },
    formatDocument: () => {
        editorRef.current?.getAction('editor.action.formatDocument').run();
    }
  }));

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define Custom "Neural Dark" Theme
    monaco.editor.defineTheme('neural-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00f0ff', fontStyle: 'bold' },
        { token: 'identifier', foreground: 'ffffff' },
        { token: 'string', foreground: '00ff88' },
        { token: 'number', foreground: 'ffaa00' },
        { token: 'operator', foreground: '00f0ff' },
        { token: 'type', foreground: '00f0ff' },
        { token: 'function', foreground: '00f0ff', fontStyle: 'bold' },
      ],
      colors: {
        'editor.background': '#050505',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#00f0ff44',
        'editorLineNumber.activeForeground': '#00f0ffcc',
        'editorIndentGuide.background': '#ffffff08',
        'editorIndentGuide.activeBackground': '#00f0ff22',
        'selection.background': '#00f0ff33',
        'editor.selectionHighlightBackground': '#00f0ff15',
        'editorCursor.foreground': '#00f0ff',
        'editor.lineHighlightBackground': '#00f0ff08',
        'editor.lineHighlightBorder': '#00f0ff22',
        'editorWidget.background': '#0a0a0a',
        'editorWidget.border': '#00f0ff44',
        'editorWidget.shadow': '#000000',
        'editorSuggestWidget.background': '#0a0a0a',
        'editorSuggestWidget.border': '#00f0ff22',
        'editorSuggestWidget.selectedBackground': '#00f0ff22',
        'editorGhostText.foreground': '#00f0ff44',
      }
    });

    monaco.editor.setTheme(theme);

    // Initial focus or settings
    editor.updateOptions({
      fontSize: 15,
      fontWeight: '500',
      fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
      fontLigatures: true,
      lineHeight: 24,
      letterSpacing: 0.5,
      minimap: { 
          enabled: true, 
          scale: 0.75, 
          renderCharacters: false,
          side: 'right',
          showSlider: 'mouseover'
      },
      scrollBeyondLastLine: true,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      lineNumbersMinChars: 3,
      padding: { top: 20, bottom: 20 },
      roundedSelection: true,
      scrollbar: {
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      }
    });

    // Handle Selection Changes
    editor.onDidChangeCursorSelection((e) => {
      if (onSelectionChange) {
        const selection = editor.getModel().getValueInRange(e.selection);
        onSelectionChange(selection);
      }
    });
  };

  const mapLanguage = (lang) => {
    const maps = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown'
    };
    return maps[lang] || lang || 'javascript';
  };

  return (
    <div className="monaco-wrapper w-full h-full relative group">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      
      <Editor
        height="100%"
        width="100%"
        language={mapLanguage(language)}
        value={value}
        theme={theme}
        path={path}
        onChange={onChange}
        onMount={handleEditorDidMount}
        loading={<div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-12 h-12 border-2 border-t-[#00f0ff] border-white/5 rounded-full animate-spin" />
            <div className="text-[#00f0ff] font-orbitron text-xs tracking-[4px] animate-pulse">NEURAL CORE INITIALIZING</div>
        </div>}
        options={{
          automaticLayout: true,
          tabSize: 2,
        }}
      />
      <style jsx>{`
        .monaco-wrapper {
            background: #030303;
            overflow: hidden;
        }
        .monaco-wrapper :global(.monaco-editor) {
            padding: 10px 0;
            background: transparent !important;
        }
        .monaco-wrapper :global(.monaco-editor .margin) {
            background: transparent !important;
        }
        .monaco-wrapper :global(.monaco-editor .scroll-decoration) {
          box-shadow: none !important;
        }
        .monaco-wrapper :global(.monaco-editor .line-numbers) {
            transition: color 0.3s;
        }
        .monaco-wrapper :global(.monaco-editor .current-line) {
            border: none !important;
        }
      `}</style>
    </div>
  );
});

MonacoEditor.displayName = 'MonacoEditor';

export default MonacoEditor;
