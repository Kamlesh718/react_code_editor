import { createContext, useContext, useRef, useState } from "react";

const ResizeContext = createContext();

const ResizeProvider = function ({ children }) {
  const [height, setHeight] = useState(160);
  const [width, setWidth] = useState(160);
  const isResizing = useRef(false);
  const resizeDirection = useRef(null); // 'vertical' or 'horizontal'

  const startResizing = (direction) => {
    isResizing.current = true;
    resizeDirection.current = direction;
  };

  const stopResizing = () => {
    isResizing.current = false;
    resizeDirection.current = null;
  };

  const handleResize = (e) => {
    if (isResizing.current) {
      if (resizeDirection.current === "vertical") {
        const newHeight = window.innerHeight - e.clientY;
        setHeight(Math.max(newHeight, 100)); // min height = 100px
      } else if (resizeDirection.current === "horizontal") {
        const newWidth = window.innerWidth - e.clientX;
        setWidth(Math.max(newWidth, 300)); // min width = 100px
      }
    }
  };

  return (
    <ResizeContext.Provider
      value={{
        height,
        setHeight,
        width,
        setWidth,
        startResizing,
        stopResizing,
        handleResize,
      }}
    >
      {children}
    </ResizeContext.Provider>
  );
};

const useResize = function () {
  const context = useContext(ResizeContext);
  if (context === undefined) {
    throw new Error("Context used outside the provider");
  }

  return context;
};

export { ResizeProvider, useResize };
