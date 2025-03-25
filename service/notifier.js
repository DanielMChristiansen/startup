const { WebSocketServer } = require("ws");
const uuid = require("uuid");

function notifier(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });

  let connections = [];

  wss.on("connection", (ws) => {
    const connection = {
      id: uuid.v4(),
      alive: true,
      ws: ws,
    };
    connections.push(connection);

    // Remove the closed connection so we don't try to forward anymore
    ws.on("close", () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on("pong", () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  // Check for upcoming assignments
  setInterval(() => {
    const now = new Date();
    for (let connection of connections) {
      connection.ws.send("Assignment may be due soon");
    }
  }, 1000 * 60 * 60);
}

module.exports = { notifier };
