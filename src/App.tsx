import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Network from "./pages/networks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/admin/network",
    element: <Network />,
  },
]);

export { router };
