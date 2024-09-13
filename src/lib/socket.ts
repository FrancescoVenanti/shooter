// client.ts
import { hc } from "hono/client";
import { WebSocketApp } from "../server";
const client = hc<WebSocketApp>("http://localhost:8080");
const ws = client.ws.$ws(0);

ws.addEventListener("message", (data) => {
  console.log(data);
});

ws.addEventListener("open", () => {
  setInterval(() => {
    ws.send(new Date().toString());
  }, 1000);
});
