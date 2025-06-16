import type { Dispatch, SetStateAction } from "react";
import type { SelectProps } from "@mui/material";

export interface Props {
  language: string;
  setLanguage: (lang: string) => void;
  theme: "light" | "dark";
}
