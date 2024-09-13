import { serve } from "@hono/node-server";
import { createNodeWebSocket } from "@hono/node-ws";
import { Hono } from "hono";

const app = new Hono();

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

const ws = app.get(
  "/ws",
  upgradeWebSocket((c) => {
    // https://hono.dev/helpers/websocket
    return {
      onMessage: (event) => {
        console.log(event.data);
      },
    };
  })
);

export type WebSocketApp = typeof ws;

const server = serve({
  port: 8080,
  fetch: app.fetch,
});
injectWebSocket(server);
