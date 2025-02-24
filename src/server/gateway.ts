import { createGrpcClient } from "../utils/grpcUtils";
import { Server } from "./server";

const serverId = process.env.SERVER_ID
  ? parseInt(process.env.SERVER_ID, 10)
  : 0;

export class GatewayServer extends Server {
  public authLb: string = process.env.AUTH_LB
    ? process.env.AUTH_LB
    : "0.0.0.0:10000";
  constructor() {
    super(serverId, "gateway");
  }
}

const server = new GatewayServer();
const wsPort = process.env.WS_PORT ? parseInt(process.env.WS_PORT, 10) : 4000;
server.startWs(wsPort); // 传递端口号给 start 方法
//const protoPackage = createGrpcClient("./src/proto/gateway.proto");
//server.startGrpc(60000, protoPackage.gateway.GatewayService.service);
