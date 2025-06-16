import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export const LanguageToggle = ({ props }: any) => {
  const handleLanguageChange = (e: SelectChangeEvent) => {
    props.setLanguage(e.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={props.language}
        defaultValue={props.language}
        onChange={handleLanguageChange}
      >
        <MenuItem value="">
          <em>Choose Language</em>
        </MenuItem>
        <MenuItem value={"English"}>English</MenuItem>
        <MenuItem value={"Russian"}>Русский</MenuItem>
      </Select>
    </FormControl>
  );
};
