import type { Props } from "./Navigation.types";
import { NavigationWrapper, NavItem, StyledNavLink } from "./styles";

export const Navigation = ({ theme, translate }: Props) => {
  return (
    <NavigationWrapper>
      <NavItem>
        <StyledNavLink to="/market">{translate("Market")}</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/history">{translate("History")}</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/favourites">{translate("Favourites")}</StyledNavLink>
      </NavItem>
    </NavigationWrapper>
  );
};