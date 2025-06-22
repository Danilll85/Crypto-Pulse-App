import { FavouritesCard } from "@entities/favouritesCard/ui";
import { FavouritesBlock } from "@entities/favouritesCard/ui/styles";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { Navbar } from "@widgets/navbar";

export const FavouritesPage = () => {
  const { theme } = useTheme();

  const getAllLocalStorageItems = (): Record<string, string> => {
    const items: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key != "theme") {
        const value = localStorage.getItem(key);
        if (value) {
          items[key] = value;
        }
      }
    }
    return items;
  };

  const localStorageItems = getAllLocalStorageItems();

  return (
    <>
      <Navbar />
      {localStorage.length > 0 && (
        <FavouritesBlock $theme={theme}>
          {Object.entries(localStorageItems).map(([key, value]) => (
            <FavouritesCard key={key} price={+value} currencyName={key} />
          ))}
        </FavouritesBlock>
      )}
    </>
  );
};
