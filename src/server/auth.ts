import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(
  './src/proto/auth.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const authPackage = grpc.loadPackageDefinition(packageDefinition) as any;

function login(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
  const { username, password } = call.request;
  // 这里添加登录逻辑
  if (username === 'admin' && password === 'password') {
    callback(null, { success: true, message: 'Login successful' });
  } else {
    callback(null, { success: false, message: 'Invalid credentials' });
  }
}

const server = new grpc.Server();
// 修改: 确保正确引用 AuthService
server.addService(authPackage.auth.AuthService.service, { login }); 
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://0.0.0.0:50051');
});