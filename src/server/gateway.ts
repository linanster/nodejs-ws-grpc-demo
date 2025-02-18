import { Server } from "./server";

const server = new Server("gateway");
server.startWs(8080); // 传递端口号给 start 方法
