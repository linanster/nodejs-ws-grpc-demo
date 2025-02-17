import * as grpc from '@grpc/grpc-js';

export function login(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
  const { username, password } = call.request;
  // 这里添加登录逻辑
  if (username === 'admin' && password === 'password') {
    callback(null, { success: true, message: 'Login successful' });
  } else {
    callback(null, { success: false, message: 'Invalid credentials' });
  }
}