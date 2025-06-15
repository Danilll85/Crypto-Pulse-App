import styled from "@emotion/styled";

const NavbarWrapper = styled.div<{ $theme: string }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem 20rem;
  background: ${({ $theme }) => ($theme === "light" ? "#f4f4f4" : "#171B26")};
  color: ${({ $theme }) => ($theme === "light" ? "black" : "white")};
`;

const LogoWrapper = styled.div`
  outline: 1px solid black;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 4rem;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ThemeWrapper = styled.div`
  outline: 1px solid black;
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ThemeImage = styled.img`
  width: 50px;
  height: 50px;
`;

export { NavbarWrapper, LogoWrapper, LogoImage, ThemeWrapper, ThemeImage };
