import { ThemeWrapper, ThemeImage } from "./styles";
import Bulb_Dark from "@assets/Bulb_Dark.svg";
import Bulb_Light from "@assets/Bulb_Light.svg";
import type { Props } from "@shared/ui/themeToggle/ThemeToggle.types";
import { useEffect } from "react";

export const ThemeToggle = ({ theme, toggleTheme, translate }: Props) => {
  useEffect(() => {
    console.log(theme);
  })

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
      {translate(theme)}
    </ThemeWrapper>
  );
};
