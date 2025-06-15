import styled from "@emotion/styled";

const NavbarWrapper = styled.div<{ $theme: string }>`
  display: flex;
  background: ${({ $theme }) => ($theme === "light" ? "#f4f4f4" : "#171B26")};
  color: ${({ $theme }) => ($theme === "light" ? "black" : "white")};
`;

const LogoWrapper = styled.div`
  font-size: 4rem;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
`;

export { NavbarWrapper, LogoWrapper, LogoImage };
