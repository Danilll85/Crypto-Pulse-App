import { FavouritesPage } from "@pages/FavouritesPage";
import { HistoryPage } from "@pages/HistoryPage";
import { HomePage } from "@pages/HomePage/index";
import { MarketPage } from "@pages/MarketPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/market",
    element: <MarketPage />,
  },
  {
    path: "/history/:currencyName?",
    element: <HistoryPage />,
  },
  {
    path: "/favourites",
    element: <FavouritesPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);
