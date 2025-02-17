import * as grpc from "@grpc/grpc-js";
import * as fs from "fs";
import * as path from "path";
import { createGrpcClient } from "../utils/grpcUtils";

const authPackage = createGrpcClient("./src/proto/auth.proto");

const server = new grpc.Server();
const grpcHandlersDir = path.join(__dirname, "../messageHandlers/auth/grpc");

// 添加: 定义 service 类型
interface Service {
  [key: string]: grpc.handleUnaryCall<any, any>;
}

const service: Service = {};

fs.readdirSync(grpcHandlersDir).forEach((file) => {
  if (file.endsWith(".ts")) {
    const handlerModule = require(path.join(grpcHandlersDir, file));
    for (const key in handlerModule) {
      if (typeof handlerModule[key] === "function") {
        service[key] = handlerModule[key];
      }
    }
  }
});

server.addService(authPackage.auth.AuthService.service, service);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server running at http://0.0.0.0:50051");
  },
);
