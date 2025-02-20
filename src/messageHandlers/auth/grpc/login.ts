import * as grpc from "@grpc/grpc-js";
import { Server } from "../../../server/server";

export function login(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
  server: Server,
) {
  const { username, password, gatewayPort } = call.request;
  // 这里添加登录逻辑
  if (username === "admin" && password === "password") {
    callback(null, {
      success: true,
      message: "Login successful: " + gatewayPort + ", " + server.grpcPort,
    });
  } else {
    callback(null, { success: false, message: "Invalid credentials" });
  }
}
