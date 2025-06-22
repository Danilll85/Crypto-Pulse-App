import { useEffect } from "react";
import type { PriceNotification } from "@features/notifications/priceNotification/priceNotification.types";
import { CloseButton, CurrencyTitle, NotificationItemContainer, Time } from "./styles";

export const NotificationItem = ({
  notification,
  onClose,
  theme = "light",
  autoCloseDelay = 5000,
}: {
  notification: PriceNotification;
  onClose: (id: string) => void;
  theme?: string;
  autoCloseDelay?: number;
}) => {
  useEffect(() => {
    if (autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [notification.id, onClose, autoCloseDelay]);

  return (
    <NotificationItemContainer $type={notification.type} $theme={theme}>
      <CloseButton onClick={() => onClose(notification.id)} $theme={theme} title="Close notification">
        ×
      </CloseButton>
      <CurrencyTitle>
        {notification.type === "spike" ? "📈" : "📉"} {notification.symbol}
      </CurrencyTitle>
      <div>
        {notification.type === "spike" ? "Price spike" : "Price drop"}: {notification.percentage.toFixed(2)}%
      </div>
      <div>Current: ${notification.price.toFixed(4)}</div>
      <Time>{new Date(notification.timestamp).toLocaleTimeString()}</Time>
    </NotificationItemContainer>
  );
};
