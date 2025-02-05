import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/register";
import Login from "../pages/login";
import Private from "./private";
import Admin from "../pages/admin";
import Network from "../pages/networks";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Home />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },

  {
    path: "/admin/social",
    element: (
      <Private>
        <Network />
      </Private>
    ),
  },
]);

export { router };
