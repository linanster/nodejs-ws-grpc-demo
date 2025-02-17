import WebSocket from 'ws';

export default function handleA(ws: WebSocket, data: any) {
  ws.send(JSON.stringify({ messageType: 'A', body: '处理 A 的逻辑' }));
}