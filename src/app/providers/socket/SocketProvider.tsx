// SocketProvider.tsx
import { useEffect, useState } from "react";
import { WebSocketContext } from ".";
import { webSocket } from "./socket";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    webSocket.init().then((ws) => {
      if (ws) {
        setSocket(ws);
        setIsConnected(true);
      }
    });

    return () => {
      webSocket.disconnect();
      setIsConnected(false);
    };
  }, []);

  const send = (data: any) => webSocket.send(data);
  const subscribe = (cb: (event: MessageEvent) => void) => webSocket.subscribe(cb);
  const unsubscribe = (cb: (event: MessageEvent) => void) => webSocket.unsubscribe(cb);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, send, subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};
