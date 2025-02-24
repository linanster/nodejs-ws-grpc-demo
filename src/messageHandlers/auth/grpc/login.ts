import * as grpc from "@grpc/grpc-js";
import { AuthServer } from "../../../server/auth";

export function login(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
  server: AuthServer,
) {
  const { username, password, gatewayPort } = call.request;
  // 这里添加登录逻辑
  if (username === "admin" && password === "password") {
    console.log(call.request);
    callback(null, {
      success: true,
      message: "Login successful: " + gatewayPort + ", " + server.serverId,
    });
  } else {
    callback(null, { success: false, message: "Invalid credentials" });
  }
}
