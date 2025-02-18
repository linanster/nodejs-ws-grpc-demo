import { createGrpcClient } from "../utils/grpcUtils";
import { Server } from "./server";

const server = new Server("gateway");
server.startWs(8080); // 传递端口号给 start 方法
const protoPackage = createGrpcClient("./src/proto/gateway.proto");
server.startGrpc(50050, protoPackage.gateway.GatewayService.service);
