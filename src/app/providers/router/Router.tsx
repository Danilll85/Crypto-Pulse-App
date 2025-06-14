import { HomePage } from "@pages/HomePage/index";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
