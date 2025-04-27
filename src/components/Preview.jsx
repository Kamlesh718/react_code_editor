import { useEffect } from "react";
import * as Babel from "@babel/standalone";

export default function Preview({ iframeRef, setLogs }) {
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data.type === "log") {
        setLogs((prev) => [
          ...prev,
          { type: e.data.logType, message: e.data.msg },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setLogs]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full"
      sandbox="allow-scripts"
      title="Preview"
    />
  );
}
