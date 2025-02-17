import * as grpc from '@grpc/grpc-js';

export function logout(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
  callback(null, { success: true, message: "" });
}