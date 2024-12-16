import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CookieCostCalculator from "./components/CookieCostCalculator";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookieCostCalculator />
  </React.StrictMode>
);
