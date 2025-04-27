import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ResizeProvider } from "./context/ResizeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResizeProvider>
      <App />
    </ResizeProvider>
  </StrictMode>
);
