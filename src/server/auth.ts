import { Server } from "./server";
import { createGrpcClient } from "../utils/grpcUtils";

const server = new Server("auth");
const protoPackage = createGrpcClient("./src/proto/auth.proto");
server.startGrpc(50051, protoPackage.auth.AuthService.service);
