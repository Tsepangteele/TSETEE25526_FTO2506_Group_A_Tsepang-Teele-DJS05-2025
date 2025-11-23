// src/main.jsx
import "./index.css";
import "./Styles/main.css";


// Here I import React's StrictMode and the ReactDOM createRoot function.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// I import BrowserRouter so I can enable routing in my app.
import { HashRouter } from "react-router-dom";


// I import my global styles and my root App component.
import "./index.css";
import App from "./App.jsx";

// Here I tell React to render my app into the <div id="root"> in index.html.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* I wrap my entire App in BrowserRouter so that
        any <Link> or <Route> inside can work correctly. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
