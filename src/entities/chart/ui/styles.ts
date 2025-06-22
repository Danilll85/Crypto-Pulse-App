import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const ChartContainer = styled.div`
  height: 600px;
  padding: 24px;
  margin: 30px 5% 30px 5%;

  @media (min-width: 769px) {
    margin: 30px 10% 30px 10%;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;

  select {
    background-color: transparent;
    padding: 2px 4px;
    border-radius: 4px;
    border: 1px solid #1c1c1c;
  }
`;

const ChartHeaderText = styled.div<{ $theme: string }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
`;

const LoadingText = styled.div<{ $theme: string }>`
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
`;

const LoadingContainer = styled.div<{ $theme: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bbackground: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  border-radius: 12px;
  z-index: 10;
`;

export { ChartContainer, ChartHeader, ChartHeaderText, LoadingText, LoadingContainer };
