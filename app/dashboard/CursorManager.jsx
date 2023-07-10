"use client";
import React, { createContext, useState } from "react";

export const CursorContext = createContext({
  mode: "normal",
  setMode: (mode) => {},
});

const CursorManager = ({ children }) => {
  const [mode, setMode] = useState("normal");
  return (
    <CursorContext.Provider value={{ mode, setMode }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorManager;
