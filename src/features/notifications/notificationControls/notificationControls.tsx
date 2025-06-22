import {
  CheckboxLabel,
  ClearNotificationButton,
  InputContainer,
  NotificationControlContainer,
  NotificationLabel,
  PercentInput,
} from "./styles";

export const NotificationControls = ({
  enabled,
  onToggleEnabled,
  threshold,
  onThresholdChange,
  notificationCount,
  onClearAll,
  theme = "light",
}: {
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  threshold: number;
  onThresholdChange: (threshold: number) => void;
  notificationCount: number;
  onClearAll: () => void;
  theme?: string;
}) => {
  return (
    <NotificationControlContainer $theme={theme}>
      <InputContainer>
        <CheckboxLabel $theme={theme}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggleEnabled(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          Enable Price Notifications
        </CheckboxLabel>

        <NotificationLabel $theme={theme}>
          Alert Threshold:
          <PercentInput
            type="number"
            min="0.1"
            max="50"
            step="0.1"
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            disabled={!enabled}
            $theme={theme}
            $enabled={enabled}
          />
          %
        </NotificationLabel>

        {notificationCount > 0 && (
          <ClearNotificationButton onClick={onClearAll} $theme={theme}>
            Clear All ({notificationCount})
          </ClearNotificationButton>
        )}
      </InputContainer>
    </NotificationControlContainer>
  );
};
