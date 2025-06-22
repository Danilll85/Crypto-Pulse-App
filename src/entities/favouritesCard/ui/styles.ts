import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const FavouritesBlock = styled.div<{ $theme: string }>`
  background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  padding: 24px;
  border-radius: 16px;
  margin: 30px 5% 30px 5%;

  @media (min-width: 769px) {
    margin: 30px 10% 30px 10%;
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 30px;
  justify-content: center;
`;

const CurrencyName = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const FavouritesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { FavouritesBlock, CurrencyName, FavouritesContainer };
