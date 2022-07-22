import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense
        fallback={
          <svg
            className="animate-spin h-5 w-5 mr-3 text-centerr"
            viewBox="0 0 24 24"
          ></svg>
        }
      >
        <App />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>
);
