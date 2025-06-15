import { createContext, type SetStateAction, type Dispatch } from "react";
import type { Action } from "./reducer";

export type ContextState = {
  theme: string;
};

type ContextType = {
  state: ContextState;
  dispatch: Dispatch<Action>;
};

export const defaultState: ContextState = { theme: "light" };

export const Context = createContext<ContextType>({
  state: defaultState,
  dispatch: () => {},
});
