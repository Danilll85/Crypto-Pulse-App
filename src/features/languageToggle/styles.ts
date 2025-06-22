import styled from "@emotion/styled";
import { FormControl, Select, MenuItem, type SelectProps } from "@mui/material";
import { colors } from "@shared/ui/styleColors";

const StyledFormControl = styled(FormControl)``;

const StyledSelect = styled(Select)<{ $theme: string }>`
  width: 65px;
  background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};

  & .MuiSelect-select {
    padding: 8px 32px 8px 12px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ $theme }) => ($theme === "light" ? colors.backgroundBodyLight : colors.backgroundBodyDark)};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  min-width: 120px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { StyledFormControl, StyledSelect, StyledMenuItem };
