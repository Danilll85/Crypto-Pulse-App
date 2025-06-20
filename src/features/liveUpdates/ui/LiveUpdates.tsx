// LiveUpdates.tsx
import { useEffect, useState } from "react";
import { useWebSocket } from "@app/providers/socket";
import { LiveTitle } from "@shared/ui/liveTitle";
import { LiveUpdatesWrapper, LiveCardsWrapper } from "./styles";
import { LiveCard } from "@entities/liveCard/ui";

export const LiveUpdates = () => {
  const { isConnected, send, subscribe, unsubscribe } = useWebSocket();
  const [messages, setMessages] = useState<any[]>([]);

  // Подписка на Kraken событие "ticker"
  useEffect(() => {
    if (!isConnected) return;

    send({
      event: "subscribe",
      pair: ["XBT/USD"],
      subscription: {
        name: "ticker",
      },
    });
  }, [isConnected]);

  // Получение сообщений от WebSocket
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        
        // фильтрация только данных тикеров
        if (Array.isArray(data) && data.length > 1 && typeof data[1] === "object") {
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Ошибка при разборе сообщения:", err);
      }
    };

    subscribe(handleMessage);
    return () => unsubscribe(handleMessage);
  }, [subscribe, unsubscribe]);

  return (
    <LiveUpdatesWrapper>
      <LiveTitle />
      <LiveCardsWrapper>
        <LiveCard categoryTitle="Overview" />
        <LiveCard categoryTitle="Trendings" />
        <LiveCard categoryTitle="Recently Added" />
        <LiveCard categoryTitle="Most Upvoted" />
      </LiveCardsWrapper>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </LiveUpdatesWrapper>
  );
};
