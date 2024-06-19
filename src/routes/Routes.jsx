import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
          ],
    },
]);
