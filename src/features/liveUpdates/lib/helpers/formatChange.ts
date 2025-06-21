export const formatChange = (change: number, isPercent: boolean = false): string => {
  const formatted = isPercent
    ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`
    : `${change >= 0 ? "+" : ""}${change.toFixed(2)}`;
  return formatted;
};
