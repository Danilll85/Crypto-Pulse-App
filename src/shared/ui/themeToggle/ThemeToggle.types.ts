import type { TFunction } from "i18next";

export interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
  translate: TFunction<"translation", undefined>;
}
