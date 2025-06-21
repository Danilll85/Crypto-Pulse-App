import { useState, useCallback, useEffect, useRef } from "react";
import type { PriceData, KrakenTickerData } from "@features/liveUpdates/ui/LiveUpdates.types";

const KRAKEN_WS_URL = "wss://ws.kraken.com/v2";

const CRYPTO_PAIRS = [
  "BTCUSD",
  "ETH/USD",
  "SOL/USD",
  "ADA/USD",
  "DOT/USD",
  "MATIC/USD",
  "AVAX/USD",
  "LINK/USD",
  "XRP/USD",
  "LTC/USD",
  "BCH/USD",
  "UNI/USD",
  "ATOM/USD",
  "FIL/USD",
  "ALGO/USD",
  "NEAR/USD",
];

export const useWebSocketPrices = () => {
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({});
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "connecting"
  );

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const processTickerData = useCallback((tickerData: KrakenTickerData) => {
    const symbol = tickerData.symbol;

    if (symbol && tickerData.last !== undefined) {
      const currentPrice = tickerData.last;
      const ask = tickerData.ask || 0;
      const bid = tickerData.bid || 0;
      const spread = ask - bid;
      const spreadPercent = ask > 0 ? (spread / ask) * 100 : 0;

      setPriceData((prev) => {
        const prevPrice = prev[symbol]?.price || currentPrice;
        const priceDirection = currentPrice > prevPrice ? "up" : currentPrice < prevPrice ? "down" : "neutral";

        return {
          ...prev,
          [symbol]: {
            symbol,
            price: currentPrice,
            change24h: tickerData.change || 0,
            changePercent24h: tickerData.change_pct || 0,
            volume24h: tickerData.volume || 0,
            high24h: tickerData.high || 0,
            low24h: tickerData.low || 0,
            vwap24h: tickerData.vwap || 0,
            ask: ask,
            askQty: tickerData.ask_qty || 0,
            bid: bid,
            bidQty: tickerData.bid_qty || 0,
            spread: spread,
            spreadPercent: spreadPercent,
            lastUpdate: Date.now(),
            priceDirection,
          },
        };
      });
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    try {
      setConnectionStatus("connecting");
      const ws = new WebSocket(KRAKEN_WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus("connected");
        reconnectAttempts.current = 0;
        const subscribeMessage = {
          method: "subscribe",
          params: {
            channel: "ticker",
            symbol: CRYPTO_PAIRS,
          },
        };
        ws.send(JSON.stringify(subscribeMessage));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.channel === "ticker" && data.data && data.data.length > 0) {
            const tickerData: KrakenTickerData = data.data[0];
            processTickerData(tickerData);
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = () => {
        setConnectionStatus("error");
      };

      ws.onclose = (event) => {
        setConnectionStatus("disconnected");
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttempts.current) * 1000;
          reconnectAttempts.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, delay);
        }
      };
    } catch (err) {
      setConnectionStatus("error");
    }
  }, [processTickerData]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close(1000, "Manual disconnect");
      wsRef.current = null;
    }
    setConnectionStatus("disconnected");
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttempts.current = 0;
    setTimeout(connectWebSocket, 1000);
  }, [connectWebSocket, disconnect]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnect();
    };
  }, [connectWebSocket, disconnect]);

  return {
    priceData,
    connectionStatus,
    reconnect,
    pairCount: Object.keys(priceData).length,
  };
};
