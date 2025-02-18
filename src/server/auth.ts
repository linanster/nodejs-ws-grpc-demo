import { Server } from "./server";
import { createGrpcClient } from "../utils/grpcUtils";

const protoPackage = createGrpcClient("./src/proto/auth.proto");
const server = new Server("auth");
server.startGrpc(50051, protoPackage.auth.AuthService.service);
