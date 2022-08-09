import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";

const appRoot = createRoot(document.getElementById("app-root"));
appRoot.render(<App />);
