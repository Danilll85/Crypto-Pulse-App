import { useEffect, useReducer, type PropsWithChildren } from "react";
import { Context, defaultState } from ".";
import { reducer } from "./reducer";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state));
  }, [state]);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};
