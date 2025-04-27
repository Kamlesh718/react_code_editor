// import { useState, useRef } from "react";
import { useResize } from "../context/ResizeContext";

function Terminal({
  showTerminal,
  setShowTerminal,
  logs,
  setLogs,
  runCodeHandler,
}) {
  const { height, startResizing, stopResizing, handleResize } = useResize();

  return (
    <div
      className="text-sm text-white bg-gray-800 border-t border-gray-700 select-none"
      onMouseMove={handleResize}
      onMouseUp={stopResizing}
      onMouseLeave={stopResizing}
    >
      {showTerminal && (
        <>
          <div
            className="h-2 cursor-row-resize bg-gray-700 hover:bg-gray-600"
            onMouseDown={() => startResizing("vertical")}
          />
          <div
            style={{ height }}
            className="bg-black font-mono text-sm overflow-auto border-t border-gray-700 space-y-1"
          >
            <div className="p-2">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet</div>
              ) : (
                logs.map((log, i) => {
                  const { type, message } =
                    typeof log === "object" && log !== null && "type" in log
                      ? log
                      : { type: "log", message: log };

                  // Set tag color based on type
                  let tagColor;
                  switch (type) {
                    case "warn":
                      tagColor = "text-yellow-400";
                      break;
                    case "error":
                      tagColor = "text-red-400";
                      break;
                    default:
                      tagColor = "text-blue-400";
                  }

                  // Format the actual message
                  let content;
                  if (typeof message === "object" && message !== null) {
                    content = (
                      <pre className="text-green-300 whitespace-pre-wrap break-words">
                        {JSON.stringify(message, null, 2)}
                      </pre>
                    );
                  } else if (typeof message === "string") {
                    content = (
                      <span className="text-blue-400 break-words">
                        {message.startsWith("[object")
                          ? `"${message}"`
                          : message}
                      </span>
                    );
                  } else if (typeof message === "number") {
                    content = (
                      <span className="text-yellow-300">{message}</span>
                    );
                  } else {
                    content = (
                      <span className="text-gray-300">{String(message)}</span>
                    );
                  }

                  return (
                    <div key={i} className="flex items-start space-x-2">
                      <span className={`text-xs font-bold ${tagColor}`}>
                        [{type.toUpperCase()}]
                      </span>
                      <div>{content}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex  p-2 space-x-2">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-3 py-1 rounded"
          onClick={runCodeHandler}
        >
          Run
        </button>
        <button
          onClick={() => setShowTerminal((prev) => !prev)}
          className="text-xs px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          {showTerminal ? "Hide Terminal" : "Show Terminal"}
        </button>
        <button
          onClick={() => setLogs([])}
          className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Logs
        </button>
      </div>
    </div>
  );
}

export default Terminal;
