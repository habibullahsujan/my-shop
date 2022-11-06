import { createBrowserRouter } from "react-router-dom";
import Blog from "../Components/Blog";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Orders from "../Components/Orders";
import Products from "../Components/Products";
import SignUp from "../Components/SignUp";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            {" "}
            <Orders />
          </PrivateRoute>
        ),
      
      },
      { path: "/blog", element: <Blog /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);
