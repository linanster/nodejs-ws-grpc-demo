import * as grpc from "@grpc/grpc-js";
import { createGrpcClient } from "../../../utils/grpcUtils";
import { sendWsResponse } from "../../../utils/wsUtils";
import WebSocket from "ws";
import { GatewayServer } from "../../../server/gateway";

export default function handlerLogin(
  ws: WebSocket,
  data: any,
  gateway: GatewayServer,
) {
  // 创建 gRPC 客户端
  const authPackage = createGrpcClient("./src/proto/auth.proto");
  const client = new (authPackage as any).auth.AuthService(
    gateway.authLb,
    grpc.credentials.createInsecure(),
  );

  console.log("Handling login request:", data);

  // 调用 gRPC 服务进行认证
  client.login(
    {
      username: data.username,
      password: data.password,
      gatewayPort: gateway.wsPort,
    },
    (err: any, response: any) => {
      if (err) {
        console.error("gRPC error:", err);
        sendWsResponse(ws, "login", {
          success: false,
          message: "认证失败" + gateway.wsPort,
        });
      } else {
        console.log("gRPC response:", response);
        sendWsResponse(ws, "login", response);
      }
    },
  );
}
