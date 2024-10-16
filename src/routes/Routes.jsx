import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Contact from "../pages/Contact/Contact";
import Achievements from "../pages/Achievements/Achievements";
import UpdatePortfolio from "../pages/UpdatePortfolio/UpdatePortfolio";
import PrivateRoute from "./PrivateRoute";
import Messages from "../pages/Messages/Messages";
import Message from "../pages/Messages/Message";

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
                path: '/achievements',
                element: <Achievements />
            },
            {
                path: '/update/:random',
                element: <PrivateRoute> <UpdatePortfolio /> </PrivateRoute>
            },
            {
                path: '/messages',
                element: <PrivateRoute> <Messages /> </PrivateRoute>
            },
            {
                path: '/message/:id',
                element: <PrivateRoute> <Message /> </PrivateRoute>
            },
        ],
    },
]);
