export function sendWsResponse(ws: WebSocket, messageType: string, body: any) {
  ws.send(
    JSON.stringify({
      messageType,
      body,
    }),
  );
}
