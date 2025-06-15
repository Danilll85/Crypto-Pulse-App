import { Context } from "@app/providers/theme";
import { useContext, useEffect } from "react";
import { NavbarWrapper } from "./styles";

export const Navbar = () => {
  const context = useContext(Context);

  useEffect(() => {
    console.log(context.state.theme);
  }, [context.state.theme]);

  const handleChangeTheme = () => {
    console.log(context.state.theme);
    context.dispatch({ type: "CHANGE_THEME" });
  };

  return (
    <NavbarWrapper $theme={context.state.theme}>
      Navbar Component
      <button onClick={handleChangeTheme}>change</button>
    </NavbarWrapper>
  );
};
