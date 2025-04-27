import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import Terminal from "../components/Terminal";
import ThemeToggle from "../components/ThemeToggle";
import CodeEditorArea from "../components/CodeEditorArea";
import Preview from "../components/Preview";
import ErrorDisplay from "../components/ErrorDisplay";
import * as Babel from "@babel/standalone";

export default function CodeEditor() {
  const [code, setCode] = useState(`
const App = () => {
  const [count, setCount] = React.useState(0);
    React.useEffect(()=>{
    const fetchData = async function(){
      const res = await fetch('https://dummyjson.com/quotes')
      const data= await res.json()
      //console.log(data.quotes)
    }
    fetchData()
  },[])
  return (
    <div>
      <h1>Welcome to React Code Editor</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))
  `);
  const [error, setError] = useState("");
  const iframeRef = useRef();
  const [showTerminal, setShowTerminal] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const runCodeHandler = () => {
    try {
      setError("");
      const transpiledCode = Babel.transform(code, {
        presets: ["react"],
      }).code;

      const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Preview</title>
    <script type="module" crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script type="module" crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      const sendLog = (type, msg) => {
        window.parent.postMessage({ type: 'log', logType: type, msg }, '*');
      };

      console.log = (...args) => {
        args.forEach(arg => sendLog('log', arg));
      };

      console.warn = (...args) => {
        args.forEach(arg => sendLog('warn', arg));
      };

      console.error = (...args) => {
        args.forEach(arg => sendLog('error', arg));
      };

      try {
        ${transpiledCode}
      } catch (err) {
        document.body.innerHTML = '<pre style="color: red;">' + err + '</pre>';
        sendLog('error', 'Runtime error: ' + err.message);
      }
    </script>
  </body>
</html>
`;
      iframeRef.current.srcdoc = html;
    } catch (e) {
      setError(e.message);
      iframeRef.current.srcdoc = `<pre style="color: red; padding: 10px;">${e.message}</pre>`;
    }
  };

  useEffect(() => {
    runCodeHandler();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex flex-col md:flex-row flex-1">
        {/* Theme toggle button */}
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

        {/* Code editor section */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col">
          <CodeEditorArea code={code} setCode={setCode} isDark={isDark} />
        </div>

        {/* Preview section */}
        <div className="w-full flex flex-col justify-content-evenly md:w-1/2 h-[50vh] md:h-full border-t md:border-t-0 md:border-l border-gray-700">
          <Preview iframeRef={iframeRef} setLogs={setLogs} />

          <Terminal
            setLogs={setLogs}
            setShowTerminal={setShowTerminal}
            logs={logs}
            showTerminal={showTerminal}
            runCodeHandler={runCodeHandler}
          />
        </div>
      </div>

      {/* Error message */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
}
