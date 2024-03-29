
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";

const appRootElement = document.getElementById("app-root");
if(appRootElement){
    const appRoot = createRoot(appRootElement);
    appRoot.render(<App />);
}
