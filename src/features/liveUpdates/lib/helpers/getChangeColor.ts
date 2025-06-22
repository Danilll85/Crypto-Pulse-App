import { colors } from "@shared/ui/styleColors";

export const getChangeColor = (changePercent24h: number, theme: string) => {
  if (changePercent24h > 0) return theme == "light" ? colors.greenLight : colors.greenDark;
  else if (changePercent24h < 0) return theme == "light" ? colors.redLight : colors.redDark;
};
