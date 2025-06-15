import { Context } from "@app/providers/theme";
import { useContext, useEffect } from "react";
import { NavbarWrapper, LogoWrapper, LogoImage } from "./styles";
import Logo_Dark from "@assets/Logo_Dark.svg";
import Logo_Light from "@assets/Logo_Light.svg";

export const Navbar = () => {
  const context = useContext(Context);

  useEffect(() => {
    console.log(context.state.theme);
  }, [context.state.theme]);

  const insertLogoImage = () => {
    const currentTheme: string = context.state.theme;

    if (currentTheme === "light") {
      return Logo_Light;
    }

    return Logo_Dark;
  };

  const handleChangeTheme = () => {
    console.log(context.state.theme);
    context.dispatch({ type: "CHANGE_THEME" });
  };

  return (
    <NavbarWrapper $theme={context.state.theme}>
      <LogoWrapper>
        Crypto Pulse
        <LogoImage src={insertLogoImage()} />
      </LogoWrapper>
      <button onClick={handleChangeTheme}>change</button>
    </NavbarWrapper>
  );
};
