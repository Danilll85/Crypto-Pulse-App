import { LogoWrapper, LogoImage } from "./styles";
import Logo_Dark from "@assets/Logo_Dark.svg";
import Logo_Light from "@assets/Logo_Light.svg";
import type { Props } from "@shared/types/PropsType";
import { useNavigate } from "react-router-dom";

export const Logo = ({ theme }: Props) => {
  const navigate = useNavigate();

  const insertLogoImage = () => {
    if (theme === "light") {
      return Logo_Light;
    }

    return Logo_Dark;
  };

  const handleClick = () => {
    navigate("/");
  }
  
  return (
    <LogoWrapper onClick={handleClick}>
      Crypto Pulse
      <LogoImage src={insertLogoImage()} />
    </LogoWrapper>
  );
};
