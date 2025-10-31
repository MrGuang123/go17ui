import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@go17/components";
import { usePrefersColorMode } from "@go17/hooks";

import App from "./App";
import { integrationThemes } from "./themes";
import "./index.css";

const Root = () => {
  const preferred = usePrefersColorMode();

  return (
    <ThemeProvider
      initialTheme={preferred}
      themes={integrationThemes}
      applyToDocument
    >
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
