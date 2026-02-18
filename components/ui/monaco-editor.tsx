"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/app/components/theme-provider";

import type {
  editor,
  IDisposable,
} from "monaco-editor";

type MonacoModule = typeof import("monaco-editor");

type MonacoEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  className?: string;
  options?: editor.IStandaloneEditorConstructionOptions;
  autoScroll?: boolean;
};

const DEFAULT_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  wordWrap: "on",
  scrollBeyondLastLine: false,
  fontSize: 13,
  tabSize: 2,
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    useShadows: false,
  },
};

function MonacoEditor({
  value,
  onChange,
  language = "html",
  className,
  options,
  autoScroll,
}: MonacoEditorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = React.useRef<MonacoModule | null>(null);
  const onChangeRef = React.useRef(onChange);
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "vs";

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    let active = true;
    let changeSubscription: IDisposable | null = null;

    void import("monaco-editor").then((monaco) => {
      if (!active || !containerRef.current) return;

      monacoRef.current = monaco;

      const instance = monaco.editor.create(containerRef.current, {
        value,
        language,
        theme: monacoTheme,
        ...DEFAULT_OPTIONS,
        ...options,
      });

      editorRef.current = instance;

      changeSubscription = instance.onDidChangeModelContent(() => {
        onChangeRef.current?.(instance.getValue());
      });
    });

    return () => {
      active = false;
      changeSubscription?.dispose();
      editorRef.current?.dispose();
      editorRef.current = null;
    };
    // Intentionally create/dispose the editor once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const monaco = monacoRef.current;
    if (!monaco) return;
    monaco.editor.setTheme(monacoTheme);
  }, [monacoTheme]);

  React.useEffect(() => {
    const instance = editorRef.current;
    const monaco = monacoRef.current;
    if (!instance || !monaco) return;

    const model = instance.getModel();
    if (!model) return;

    if (model.getLanguageId() !== language) {
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  React.useEffect(() => {
    const instance = editorRef.current;
    if (!instance) return;

    const currentValue = instance.getValue();
    if (currentValue !== value) {
      instance.setValue(value);
    }

    if (autoScroll) {
      const lineCount = instance.getModel()?.getLineCount() || 0;
      instance.revealLine(lineCount, 1);
    }
  }, [value, autoScroll]);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}

export { MonacoEditor };

