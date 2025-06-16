import { FavouritesPage } from "@pages/FavouritesPage";
import { HistoryPage } from "@pages/HistoryPage";
import { HomePage } from "@pages/HomePage/index";
import { MarketPage } from "@pages/MarketPage";
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
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/favourites",
    element: <FavouritesPage />,
  },
]);
