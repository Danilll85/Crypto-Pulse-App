import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const ThemeWrapper = styled.div<{ $theme: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundBodyLight : colors.backgroundBodyDark)};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ThemeImage = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
`;

export { ThemeWrapper, ThemeImage };
