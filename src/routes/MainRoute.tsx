import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import SalesHistory from "../pages/SalesHistory";
import Inventory from "../pages/Inventory";
import Users from "../pages/Users";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/sales-history",
        element: <SalesHistory />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default MainRoute;