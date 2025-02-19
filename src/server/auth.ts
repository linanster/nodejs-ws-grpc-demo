import { Server } from "./server";
import { createGrpcClient } from "../utils/grpcUtils";

const server = new Server("auth");
const protoPackage = createGrpcClient("./src/proto/auth.proto");
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 50051;
server.startGrpc(port, protoPackage.auth.AuthService.service);