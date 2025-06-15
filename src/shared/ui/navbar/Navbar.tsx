import { useState } from "react";
import { NavbarWrapper, ThemeWrapper, ThemeImage } from "./styles";
import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { Logo } from "@shared/ui/logo";
import { useTheme } from "@shared/lib/hooks/useTheme";
import Bulb_Dark from "@assets/Bulb_Dark.svg";
import Bulb_Light from "@assets/Bulb_Light.svg";

export const Navbar = () => {
  const [language, setLanguage] = useState("English");
  const { theme, toggleTheme } = useTheme();

  const insertThemeImage = () => {
    if (theme === "light") {
      return Bulb_Light;
    }

    return Bulb_Dark;
  };

  const handleChangeTheme = () => {
    toggleTheme();
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  return (
    <NavbarWrapper $theme={theme}>
      <Logo />

      <ThemeWrapper onClick={handleChangeTheme}>
        <ThemeImage src={insertThemeImage()} />
        {theme}
      </ThemeWrapper>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={language}
          defaultValue={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value="">
            <em>Choose Language</em>
          </MenuItem>
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Russian"}>Русский</MenuItem>
        </Select>
      </FormControl>
    </NavbarWrapper>
  );
};

/* to-do
  merge ThemeWrapper and ChooseLanguage in one SettingsComponent
  localization
*/