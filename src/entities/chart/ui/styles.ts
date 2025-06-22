import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";
import { COLORS } from "../config/colors";
import { keyframes } from "@emotion/react";

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

export const ChartCanvasWrapper = styled.div<{ $theme: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ $theme }) =>
    $theme === "light" ? colors.backgroundLight : colors.backgroundDark};
  border: 1px solid ${COLORS.GRID};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  position: relative;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${COLORS.GRID};
  border-top-color: ${COLORS.PRICE_LINE};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export { ChartContainer, ChartHeader, ChartHeaderText, LoadingText, LoadingContainer };
