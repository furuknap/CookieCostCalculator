import React from "react";
import ReactDOM from "react-dom/client";
import CookieCostCalculator from "./components/CookieCostCalculator";
import "./index.css"; // If you have global styles

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookieCostCalculator />
  </React.StrictMode>
);
