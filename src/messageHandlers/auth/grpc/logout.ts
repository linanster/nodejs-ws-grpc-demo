import * as grpc from "@grpc/grpc-js";
import { AuthServer } from "../../../server/auth";

export function logout(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
  server: AuthServer,
) {
  callback(null, { success: true, message: "" });
}
