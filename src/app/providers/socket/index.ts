// index.ts
import { createContext, useContext } from "react";

export interface WebSocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  send: (data: any) => void;
  subscribe: (cb: (event: MessageEvent) => void) => void;
  unsubscribe: (cb: (event: MessageEvent) => void) => void;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used inside a SocketProvider");
  return context;
};
