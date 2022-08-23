import React from "react";
import { createRoot } from "react-dom/client";
import Router from "../src/router";
import AppContext from "./context/main-context";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppContext>
      <Router />
    </AppContext>
  </React.StrictMode>
);
