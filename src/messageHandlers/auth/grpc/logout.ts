import * as grpc from "@grpc/grpc-js";
import { Server } from "../../../server/server";

export function logout(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
  server: Server,
) {
  callback(null, { success: true, message: "" });
}
