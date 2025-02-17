import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

export function createGrpcClient(protoPath: string) {
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  return grpc.loadPackageDefinition(packageDefinition) as any;
}
