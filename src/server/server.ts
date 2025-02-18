import WebSocket from "ws";
import fs from "fs";
import path from "path";
import { sendWsResponse } from "../utils/wsUtils";

export class Server {
  public serverType: string;
  private wss: WebSocket.Server | undefined;

  constructor(serverType: string) {
    this.serverType = serverType;
  }

  public startWs(port: number): void {
    this.wss = new WebSocket.Server({ port }); // 初始化 wss

    const handlersPath = path.join(
      __dirname,
      "../messageHandlers/" + this.serverType + "/ws/",
    );
    const handlers = fs
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

    this.wss.on("connection", (ws) => {
      console.log("New client connected");

      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message.toString());
          console.log(`Received message => ${message}`);

          const handler = handlers![data.messageType];
          if (handler) {
            handler(ws, data.body);
          } else {
            sendWsResponse(ws, data.messageType, "暂不支持!");
          }
        } catch (error) {
          console.error("Invalid JSON message received:", error);
          sendWsResponse(ws, "error", "Invalid JSON format");
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log(`WebSocket server is running on ws://localhost:${port}`); // 使用传入的端口号
  }
}
