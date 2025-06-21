import { RouterProvider } from "react-router-dom";
import { routes } from "@app/providers/router/index";
import { ThemeProvider } from "@app/providers/theme/ThemeContext";
import "@app/providers/i18n/i18n";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
