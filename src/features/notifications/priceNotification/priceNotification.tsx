import { useState, useEffect, useRef } from "react";
import type { PriceNotification, PriceNotificationsProps } from "./priceNotification.types";
import { NotificationItem } from "../notificationItem/notificationItem";
import { NotificationControls } from "../notificationControls/notificationControls";
import { NotificationsContainer } from "./styles";

export const PriceNotifications = ({
  priceData,
  theme = "light",
  defaultThreshold = 5,
  maxNotifications = 10,
  autoCloseDelay = 5000,
  enableBrowserNotifications = true,
  className,
}: PriceNotificationsProps) => {
  const [notifications, setNotifications] = useState<PriceNotification[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [priceThreshold, setPriceThreshold] = useState(defaultThreshold);
  const previousPricesRef = useRef<Record<string, number>>({});
  const browserNotificationPermissionRef = useRef(false);

  useEffect(() => {
    if (enableBrowserNotifications && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          browserNotificationPermissionRef.current = permission === "granted";
        });
      } else {
        browserNotificationPermissionRef.current = Notification.permission === "granted";
      }
    }
  }, [enableBrowserNotifications]);

  useEffect(() => {
    if (!notificationsEnabled || !priceData) return;

    Object.values(priceData).forEach((currentData) => {
      const previousPrice = previousPricesRef.current[currentData.symbol];

      if (previousPrice && previousPrice !== currentData.price) {
        const percentChange = ((currentData.price - previousPrice) / previousPrice) * 100;
        const absPercentChange = Math.abs(percentChange);

        if (absPercentChange >= priceThreshold) {
          const notification: PriceNotification = {
            id: `${currentData.symbol}-${Date.now()}-${Math.random()}`,
            symbol: currentData.symbol,
            type: percentChange > 0 ? "spike" : "drop",
            percentage: absPercentChange,
            price: currentData.price,
            timestamp: Date.now(),
          };

          setNotifications((prev) => [notification, ...prev.slice(0, maxNotifications - 1)]);

          if (enableBrowserNotifications && browserNotificationPermissionRef.current) {
            try {
              new Notification(`${currentData.symbol} ${percentChange > 0 ? "Spike" : "Drop"}`, {
                body: `${absPercentChange.toFixed(2)}% change - $${currentData.price.toFixed(4)}`,
                icon: percentChange > 0 ? "📈" : "📉",
                tag: currentData.symbol,
              });
            } catch (error) {
              console.warn("Browser notification failed:", error);
            }
          }
        }
      }

      previousPricesRef.current[currentData.symbol] = currentData.price;
    });
  }, [priceData, notificationsEnabled, priceThreshold, maxNotifications, enableBrowserNotifications]);

  const handleCloseNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className={className}>
      <style>{`
                @keyframes priceNotificationSlideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>

      <NotificationControls
        enabled={notificationsEnabled}
        onToggleEnabled={setNotificationsEnabled}
        threshold={priceThreshold}
        onThresholdChange={setPriceThreshold}
        notificationCount={notifications.length}
        onClearAll={clearAllNotifications}
        theme={theme}
      />

      {notifications.length > 0 && (
        <NotificationsContainer>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={handleCloseNotification}
              theme={theme}
              autoCloseDelay={autoCloseDelay}
            />
          ))}
        </NotificationsContainer>
      )}
    </div>
  );
};
