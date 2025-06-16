import { useState } from "react";
import { NavbarWrapper, SettingsWrapper } from "./styles";
import { Logo } from "@shared/ui/logo";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { ThemeToggle } from "@shared/ui/themeToggle";
import { LanguageToggle } from "@shared/ui/languageToggle";
import { Navigation } from "@shared/ui/navigation";

export const Navbar = () => {
  const [language, setLanguage] = useState("English");
  const { theme, toggleTheme } = useTheme();

  return (
    <NavbarWrapper $theme={theme}>
      <Logo theme={theme} />
      <Navigation />
      <SettingsWrapper>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageToggle props={{ language, setLanguage }} />
      </SettingsWrapper>
    </NavbarWrapper>
  );
};

/* to-do
  localization
*/
