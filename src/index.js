import React from "react";
import ReactDOM from "react-dom/client";
import {  HashRouter } from "react-router-dom";

// bootstarp
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// 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
// common scss
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
