export interface PriceData {
  symbol: string;
  price: number;
  [key: string]: any;
}

export interface PriceNotification {
  id: string;
  symbol: string;
  type: "spike" | "drop";
  percentage: number;
  price: number;
  timestamp: number;
}

export interface PriceNotificationsProps {
  priceData: Record<string, PriceData>;
  theme?: string;
  defaultThreshold?: number;
  maxNotifications?: number;
  autoCloseDelay?: number;
  enableBrowserNotifications?: boolean;
  className?: string;
}
