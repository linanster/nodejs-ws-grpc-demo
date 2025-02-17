import * as grpc from "@grpc/grpc-js";
import * as fs from "fs";
import * as path from "path";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync("./src/proto/auth.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authPackage = grpc.loadPackageDefinition(packageDefinition) as any;

const server = new grpc.Server();
const grpcHandlersDir = path.join(__dirname, "../messageHandlers/grpc");

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
