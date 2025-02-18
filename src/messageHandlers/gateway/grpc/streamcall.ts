import * as grpc from "@grpc/grpc-js";
import { gateway } from "../../../proto/gateway";

export function streamcall(call: any, callback: any) {
  call.on("data", (request: gateway.Request) => {
    console.log(`Received request: ${request.message}`);
    const response = new gateway.Response();
    response.message = `Echo: ${request.message}`;
    call.write(response);
  });

  call.on("end", () => {
    call.end();
  });
}
