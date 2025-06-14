import { RouterProvider } from "react-router-dom";
import { routes } from "@app/providers/router/index"

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
