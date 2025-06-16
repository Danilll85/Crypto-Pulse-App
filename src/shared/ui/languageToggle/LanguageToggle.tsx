import { StyledFormControl, StyledSelect, StyledMenuItem } from "./styles";
import type { Props } from "./Language.types";
import { useEffect } from "react";

export const LanguageToggle = ({ language, setLanguage }: Props) => {
  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    console.log(language);
  }, []);
  return (
    <StyledFormControl>
      <StyledSelect
        value={language}
        defaultValue={language}
        onChange={handleLanguageChange}
        MenuProps={{
          PaperProps: {
            style: {
              minWidth: 120,
              maxWidth: 120,
            },
          },
        }}
      >
        <StyledMenuItem value="English">English</StyledMenuItem>
        <StyledMenuItem value="Russian">Русский</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
};
