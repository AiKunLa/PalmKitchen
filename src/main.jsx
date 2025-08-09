import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "lib-flexible";
import { BrowserRouter as Router } from "react-router-dom";

// 仅用于测试生产 mock
if (import.meta.env.PROD) {
  import('./mock/mockProdServer').then(({ setupProdMockServer }) => {
    setupProdMockServer();
  });
}

createRoot(document.getElementById("root")).render(
  <Router>
      <App />
  </Router>
);
