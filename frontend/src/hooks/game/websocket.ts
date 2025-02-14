import { useEffect, useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const WS_URL = "ws://localhost:8080"; // WebSocket サーバーの URL

export default function useGameState() {
  const [status, setStatus] = useState("Connecting...");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ignore = false;
    if (ignore) {
      return;
    }

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => setStatus("Connected");
    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setStatus(event.data); // サーバーからのレスポンスを表示
    };
    ws.onclose = () => setStatus("Disconnected");

    setSocket(ws);

    ignore = true;

    return () => {
      ignore = false;
      ws.close();
    };
  }, []);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    },
  });

  const handleSendMessage = useCallback(() => {
    sendMessageMutation.mutate("Player Ready");
  }, [sendMessageMutation]);

  return {
    socket,
    status,
    handleSendMessage,
  };
}
