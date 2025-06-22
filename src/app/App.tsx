import { RouterProvider } from "react-router-dom";
import { routes } from "@app/providers/router/index";
import { ThemeProvider } from "@app/providers/theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@app/providers/i18n/i18n";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
