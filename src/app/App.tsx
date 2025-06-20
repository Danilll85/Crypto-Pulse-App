import { RouterProvider } from "react-router-dom";
import { routes } from "@app/providers/router/index";
import { ThemeProvider } from "@app/providers/theme/ThemeContext";
import "@app/providers/i18n/i18n";
import { SocketProvider } from "@app/providers/socket/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <ThemeProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ThemeProvider>
    </SocketProvider>
  );
}

export default App;
