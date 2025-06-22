import styled from "@emotion/styled";
import { colors } from "@shared/ui/styleColors";

const ClearNotificationButton = styled.button<{ $theme: string }>`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ $theme }) => ($theme === "light" ? colors.redLight : colors.redDark)};
  background-color: transparent;
  color: ${({ $theme }) => ($theme === "light" ? colors.redLight : colors.redDark)};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
`;

const NotificationLabel = styled.label<{ $theme: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
`;

const CheckboxLabel = styled.label<{ $theme: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  cursor: pointer;
`;

const PercentInput = styled.input<{ $theme: string; $enabled: boolean }>`
  width: 70px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  color: ${({ $theme }) => ($theme === "light" ? colors.textColorLight : colors.textColorDark)};
  opacity: ${({ $enabled }) => ($enabled ? 1 : 0.5)};
`;

const NotificationControlContainer = styled.div<{ $theme: string }>`
  padding: 16px;
  margin: 16px 0;
  background-color: ${({ $theme }) => ($theme === "light" ? colors.backgroundLight : colors.backgroundDark)};
  border-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export {
  ClearNotificationButton,
  NotificationLabel,
  PercentInput,
  CheckboxLabel,
  NotificationControlContainer,
  InputContainer,
};
