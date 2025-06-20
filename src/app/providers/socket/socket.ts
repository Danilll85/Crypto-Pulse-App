// socket.ts
import { fetchKrakenToken } from "./token";

const URL = "wss://ws-auth.kraken.com/v2";

type MessageCallback = (msg: any) => void;

const subscribers: MessageCallback[] = [];

export const subscribeToMessages = (cb: MessageCallback) => {
  subscribers.push(cb);
};

(async function initSocket() {
  const token = await fetchKrakenToken();
  const socket = new WebSocket(URL);

  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        method: "authenticate",
        token,
        req_id: 1,
      })
    );
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    console.log("Message from Kraken:", message);

    // Уведомить всех подписчиков
    subscribers.forEach((cb) => cb(message));

    if (message.method === "authenticated") {
      console.log("✅ Authenticated successfully");

      socket.send(
        JSON.stringify({
          method: "subscribe",
          params: {
            channel: "ownTrades",
          },
          req_id: 2,
        })
      );
    }
  });

  socket.addEventListener("error", (err) => {
    console.error("WebSocket error:", err);
  });

  socket.addEventListener("close", () => {
    console.log("🔌 WebSocket closed");
  });
})();
