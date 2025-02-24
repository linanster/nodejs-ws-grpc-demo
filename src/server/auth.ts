import { Server } from "./server";
import { createGrpcClient } from "../utils/grpcUtils";

const serverId = process.env.SERVER_ID
  ? parseInt(process.env.SERVER_ID, 10)
  : 0;

export class AuthServer extends Server {
  constructor() {
    super(serverId, "auth");
  }
}

const server = new AuthServer();
const protoPackage = createGrpcClient("./src/proto/auth.proto");
const grpcPort = process.env.GRPC_PORT
  ? parseInt(process.env.GRPC_PORT, 10)
  : 5000;
server.startGrpc(grpcPort, protoPackage.auth.AuthService.service);
