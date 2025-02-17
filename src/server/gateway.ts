import WebSocket from "ws";
import fs from "fs";
import path from "path";

const wss = new WebSocket.Server({ port: 8080 });

const handlersPath = path.join(__dirname, "../messageHandlers/gateway/ws/");
const handlers: Record<string, (ws: WebSocket, data: any) => void> = fs
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(".ts"))
  .reduce(
    (acc, file) => {
      const messageType = path.basename(file, ".ts");
      acc[messageType] = require(path.join(handlersPath, file)).default;
      return acc;
    },
    {} as Record<string, (ws: WebSocket, data: any) => void>,
  );

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`Received message => ${message}`);

      const handler = handlers[data.messageType];
      if (handler) {
        handler(ws, data.body);
      } else {
        ws.send(
          JSON.stringify({ messageType: data.messageType, body: "暂不支持!" }),
        );
      }
    } catch (error) {
      console.error("Invalid JSON message received:", error);
      ws.send(
        JSON.stringify({ messageType: "error", body: "Invalid JSON format" }),
      );
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
