import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// 加载 proto 文件
const PROTO_PATH = __dirname + '/../../../src/proto/auth.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const authPackage = grpc.loadPackageDefinition(packageDefinition) as any;

// 创建 gRPC 客户端
const client = new (authPackage as any).auth.AuthService('0.0.0.0:50051', grpc.credentials.createInsecure());

export default function handlerLogout(ws: WebSocket, data: any) {
  console.log('Handling logout request:', data);

  // 调用 gRPC 服务进行认证
  client.logout({ username: data.username, password: data.password }, (err: any, response: any) => {
    if (err) {
      console.error('gRPC error:', err);
      ws.send(JSON.stringify({ messageType: 'logoutResponse', body: { success: false, message: '认证失败' } }));
    } else {
      console.log('gRPC response:', response);
      ws.send(JSON.stringify({ messageType: 'logoutResponse', body: response }));
    }
  });
}