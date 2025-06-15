import { createContext, type Dispatch } from "react";
import type { Action } from "./reducer";

export type Theme = "light" | "dark";

export type ContextState = {
  theme: Theme;
};

export type ContextType = {
  state: ContextState;
  dispatch: Dispatch<Action>;
};

export const defaultState: ContextState = { theme: "light" };

export const Context = createContext<ContextType>({
  state: defaultState,
  dispatch: () => {},
});
