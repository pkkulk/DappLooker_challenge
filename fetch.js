import WebSocket from "ws";

const wallet = "0x19f03256cf9e42105f424dbb99e5e00d5f1e9f1d";
const ws = new WebSocket("wss://api.hyperliquid.xyz/info");

ws.on("open", () => {
  console.log("✅ Connected to HyperLiquid WebSocket");

  // Correct message format
  const msg = {
    type: {
      userPnl: {
        user: wallet,
      },
    },
  };

  ws.send(JSON.stringify(msg));
});

ws.on("message", (data) => {
  const response = JSON.parse(data);
  console.log("📩 Received:", response);
});

ws.on("error", (err) => console.error("⚠️ Error:", err.message));
ws.on("close", () => console.log("❌ WebSocket closed"));
