import { ThemeWrapper, ThemeImage } from "./styles";
import Bulb_Dark from "@assets/Bulb_Dark.svg";
import Bulb_Light from "@assets/Bulb_Light.svg";
import type { Props } from "@shared/ui/themeToggle/ThemeToggle.types";

export const ThemeToggle = ({ theme, toggleTheme }: Props) => {
  const insertThemeImage = () => {
    if (theme === "light") {
      return Bulb_Light;
    }

    return Bulb_Dark;
  };

  const handleChangeTheme = () => {
    toggleTheme();
  };

  return (
    <ThemeWrapper onClick={handleChangeTheme}>
      <ThemeImage src={insertThemeImage()} />
      {theme}
    </ThemeWrapper>
  );
};
