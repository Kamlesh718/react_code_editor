import Editor from "@monaco-editor/react";

export default function CodeEditorArea({ code, setCode, isDark }) {
  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        language="javascript"
        theme={isDark ? "vs-dark" : "vs"}
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}
