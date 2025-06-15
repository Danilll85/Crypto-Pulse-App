import { Context } from "@app/providers/theme";
import { useContext } from "react";
import { type ContextType, type Theme } from "@app/providers/theme";

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const context = useContext<ContextType>(Context);

  return {
    theme: context.state.theme,
    toggleTheme: () => context.dispatch({ type: "CHANGE_THEME" }),
  };
};
