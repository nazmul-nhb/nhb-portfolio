import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Contact from "../pages/Contact/Contact";
import Blogs from "../pages/Blogs/Blogs";
import UpdatePortfolio from "../pages/UpdatePortfolio/UpdatePortfolio";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/update/:random',
                element: <PrivateRoute> <UpdatePortfolio /> </PrivateRoute>
            },
        ],
    },
]);
