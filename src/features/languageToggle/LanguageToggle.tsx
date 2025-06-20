import { StyledFormControl, StyledSelect, StyledMenuItem } from "./styles";
import type { Props } from "./Language.types";
import { useEffect, useState } from "react";

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
        value={currentLanguage}
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
        <StyledMenuItem value="en">English</StyledMenuItem>
        <StyledMenuItem value="ru">Русский</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
};
