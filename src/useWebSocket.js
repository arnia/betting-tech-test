import { useRef, useEffect } from "react";

function useWebSocket(fn) {
  const wsRef = useRef();

  useEffect(() => {
    const w = new WebSocket("ws://localhost:8889");

    w.addEventListener("message", e => {
      const wEventDTO = JSON.parse(e.data);
      fn(wEventDTO);
    });

    w.onopen = () => {
      w.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));
    };

    wsRef.current = w;
  }, []);

  return wsRef.current;
}

export default useWebSocket;
