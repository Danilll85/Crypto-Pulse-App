import styled from "@emotion/styled";
import { FormControl, Select, MenuItem, type SelectProps } from "@mui/material";

const StyledFormControl = styled(FormControl)`
  min-width: 8rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 100%;

  & .MuiSelect-select {
    padding: 8px 32px 8px 12px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #e0e0e0;
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
