import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { appRouter } from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
    <>
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    </>
);
