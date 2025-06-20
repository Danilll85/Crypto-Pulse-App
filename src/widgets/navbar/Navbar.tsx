import { NavbarWrapper, SettingsWrapper } from "./styles";
import { Logo } from "@shared/ui/logo";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { ThemeToggle } from "@features/themeToggle";
import { LanguageToggle } from "@features/languageToggle";
import { Navigation } from "@shared/ui/navigation";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n, ready } = useTranslation();

  // useEffect(() => {
  //   console.log("Current language:", i18n.language);
  //   console.log("Translation test:", t("light"));
  // }, [i18n.language, t]);

  if (!ready) return <div>Loading...</div>;

  return (
    <NavbarWrapper $theme={theme}>
      <Logo theme={theme} />
      <Navigation theme={theme} translate={t} />
      <SettingsWrapper>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} translate={t} />
        <LanguageToggle
          language={i18n.language}
          setLanguage={(lang: string) => i18n.changeLanguage(lang)}
          theme={theme}
        />
      </SettingsWrapper>
    </NavbarWrapper>
  );
};

/*
styles for language toggle (depends on theme)
*/
