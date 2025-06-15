import { LogoWrapper, LogoImage } from "./styles";
import { useTheme } from "@shared/lib/hooks/useTheme";
import Logo_Dark from "@assets/Logo_Dark.svg";
import Logo_Light from "@assets/Logo_Light.svg";

export const Logo = () => {
  const { theme } = useTheme();
  const insertLogoImage = () => {
    if (theme === "light") {
      return Logo_Light;
    }

    return Logo_Dark;
  };
  return (
    <LogoWrapper>
      Crypto Pulse
      <LogoImage src={insertLogoImage()} />
    </LogoWrapper>
  );
};
