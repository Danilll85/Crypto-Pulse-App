import styled from "@emotion/styled";

const NavbarWrapper = styled.div<{ $theme: string }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem 20rem;
  background: ${({ $theme }) => ($theme === "light" ? "#f4f4f4" : "#171B26")};
  color: ${({ $theme }) => ($theme === "light" ? "black" : "white")};
`;

const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export { NavbarWrapper, SettingsWrapper };
