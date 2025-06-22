import { StyledFormControl, StyledSelect, StyledMenuItem } from "./styles";
import type { Props } from "./Language.types";
import { useState } from "react";

export const LanguageToggle = ({ language, setLanguage, theme }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleLanguageChange = (e: any) => {
    console.log(e.target.value);

    setLanguage(e.target.value);
    setCurrentLanguage(e.target.value);
  };

  return (
    <StyledFormControl>
      <StyledSelect
        $theme={theme}
        value={currentLanguage}
        onChange={handleLanguageChange}
        MenuProps={{
          PaperProps: {
            style: {
              minWidth: 65,
              maxWidth: 65,
            },
          },
        }}
      >
        <StyledMenuItem value="en">EN</StyledMenuItem>
        <StyledMenuItem value="ru">RU</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
};
