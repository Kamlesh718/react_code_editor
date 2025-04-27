export default function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div className="p-4 bg-[#2d2d2d] text-[#ff5555] font-mono text-sm overflow-auto">
      <strong>Syntax Error:</strong> {error}
    </div>
  );
}
