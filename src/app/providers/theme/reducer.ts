import type { ContextState } from ".";

export type Action = { type: "CHANGE_THEME" };

export const reducer = (state: ContextState, action: Action) => {
  if (action.type === "CHANGE_THEME") {
    return { ...state, theme: state.theme === "light" ? "dark" : "light" };
  }
  return state;
};
