// app/providers/socket/socket.ts
import { WSURL } from "./config/WSURL";
import { fetchKrakenToken } from "./token"; // <-- твой файл

type MessageHandler = (event: MessageEvent) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private url = WSURL;
  private listeners: MessageHandler[] = [];
  private authToken: string | null = null;

  async init(): Promise<WebSocket | null> {
    if (this.socket) return this.socket;

    try {
      this.authToken = await fetchKrakenToken();
    } catch (error) {
      console.error("Ошибка получения токена Kraken:", error);
      return null;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");

      if (this.authToken) {
        this.socket!.send(
          JSON.stringify({
            event: "authenticate",
            token: this.authToken,
          })
        );
        console.log("Authentication sent");
      }
    };

    this.socket.onmessage = (event) => {
      this.listeners.forEach((cb) => cb(event));
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return new Promise((resolve) => {
      this.socket!.onopen = () => resolve(this.socket);
    });
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not open. Cannot send:", data);
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.listeners = [];
  }

  subscribe(cb: MessageHandler) {
    this.listeners.push(cb);
  }

  unsubscribe(cb: MessageHandler) {
    this.listeners = this.listeners.filter((fn) => fn !== cb);
  }
}

export const webSocket = new WebSocketService();
