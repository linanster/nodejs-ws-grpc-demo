import * as grpc from "@grpc/grpc-js";
import { gateway } from "./proto/gateway";

// 创建 gRPC 客户端
const client = new gateway.GatewayServiceClient(
  "localhost:50050",
  grpc.credentials.createInsecure(),
);

// 创建一个流式调用
const call = client.Streamcall();

// 监听服务器的响应
call.on("data", (response: gateway.Response) => {
  console.log(`Received response: ${response.message}`);
});

call.on("end", () => {
  console.log("Server has ended the stream");
});

// 发送请求到服务器
const request = new gateway.Request();
request.message = "Hello, Server!";
call.write(request);

// 结束客户端流
setTimeout(() => {
  call.end();
}, 1000);
