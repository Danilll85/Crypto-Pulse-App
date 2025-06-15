import styled from "styled-components";

const NavbarWrapper = styled.div<{$theme: string}>`
  background: ${({ $theme }) => ($theme === "light" ? "green" : "orange")};
`;

export { NavbarWrapper };
