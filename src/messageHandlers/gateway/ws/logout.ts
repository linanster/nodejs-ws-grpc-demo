import * as grpc from "@grpc/grpc-js";
import { createGrpcClient } from "../../../utils/grpcUtils";
import { sendWsResponse } from "../../../utils/wsUtils";
import WebSocket from "ws";

const authPackage = createGrpcClient("./src/proto/auth.proto");

// 创建 gRPC 客户端
const client = new (authPackage as any).auth.AuthService(
  "0.0.0.0:50051",
  grpc.credentials.createInsecure(),
);

export default function handlerLogout(ws: WebSocket, data: any) {
  console.log("Handling logout request:", data);

  // 调用 gRPC 服务进行认证
  client.logout(
    { username: data.username, password: data.password },
    (err: any, response: any) => {
      if (err) {
        console.error("gRPC error:", err);
        sendWsResponse(ws, "logoutResponse", {
          success: false,
          message: "认证失败",
        });
      } else {
        console.log("gRPC response:", response);
        sendWsResponse(ws, "logoutResponse", response);
      }
    },
  );
}
