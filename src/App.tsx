import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Network from "./pages/networks";
import Private from "./routes/private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
