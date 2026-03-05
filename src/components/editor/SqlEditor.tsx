"use client";

import { useRef, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { sql, SQLite } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
}

export default function SqlEditor({ value, onChange, onRun }: SqlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        sql({ dialect: SQLite }),
        oneDark,
        EditorView.theme({
          "&": {
            fontSize: "14px",
            maxHeight: "300px",
            background: "var(--color-surface-2)",
          },
          ".cm-scroller": { overflow: "auto" },
          ".cm-content": { fontFamily: "var(--font-code)" },
          ".cm-gutters": {
            background: "var(--color-surface-1)",
            borderRight: "1px solid var(--color-border)",
          },
          "&.cm-focused": {
            outline: "none",
          },
        }),
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              onRunRef.current();
              return true;
            },
          },
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => view.destroy();
    // Only create once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes into the editor
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={editorRef}
        className="overflow-hidden rounded-lg"
        style={{ border: "1px solid var(--color-border-strong)" }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Cmd/Ctrl + Enter to run
        </span>
        <button
          onClick={onRun}
          className="cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-ring"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-background)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Run Query
        </button>
      </div>
    </div>
  );
}
