import type { TFunction } from "i18next";

export interface Props {
    theme: "light" | "dark";
    translate: TFunction<"translation", undefined>;
}