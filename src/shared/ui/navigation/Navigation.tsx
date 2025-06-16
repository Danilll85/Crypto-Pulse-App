import { NavLink, useNavigate } from "react-router-dom";
import { NavigationWrapper, NavItem, StyledNavLink } from "./styles";

export const Navigation = () => {
  return (
    <NavigationWrapper>
      <NavItem>
        <StyledNavLink to="/market">Market</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/history">History</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/favourites">Favourites</StyledNavLink>
      </NavItem>
    </NavigationWrapper>
  );
};
