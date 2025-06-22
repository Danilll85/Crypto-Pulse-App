import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const CurrencyTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Time = styled.p`
  font-size: 10px;
`;

const NotificationItemContainer = styled.div<{ $type: string; $theme: string }>`
  padding: 12px 16px;
  margin: 8px 0;
  background-color: ${({ $type, $theme }) =>
    $type === "spike" ? ($theme === "light" ? "#d4edda" : "#1e4d2b") : $theme === "light" ? "#f8d7da" : "#4d1e20"};
  border-radius: 8px;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  position: relative;
  animation: priceNotificationSlideIn 0.3s ease-out;
  boxshadow: 0 2px 8px ${colors.backgroundBodyDark};
  minwidth: 280px;
`;

const CloseButton = styled.button<{ $theme: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  opacity: 0.7;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { CurrencyTitle, Time, NotificationItemContainer, CloseButton };
