import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavItem = styled.div`
  text-decoration: none;
  font-size: 2rem;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

export { NavigationWrapper, NavItem, StyledNavLink };
