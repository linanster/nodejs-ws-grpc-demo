import WebSocket from 'ws';

export default function handleB(ws: WebSocket, data: any) {
  ws.send(JSON.stringify({ messageType: 'B', body: '处理 B 的逻辑' }));
}