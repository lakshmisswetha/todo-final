import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { appRouter } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
    <>
        <RouterProvider router={appRouter} />
    </>
);
