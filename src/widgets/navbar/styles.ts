import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const NavbarWrapper = styled.div<{ $theme: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 12px;
  background: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};

  padding: 30px 5% 30px 5%;

  @media (min-width: 769px) {
    padding: 30px 10% 30px 10%;
    justify-content: space-between;
  }
`;

const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export { NavbarWrapper, SettingsWrapper };
