import axios from "axios";

const wallet = "0x19f03256cf9e42105f424dbb99e5e00d5f1e9f1d";
const apiUrl = "https://api.hyperliquid.xyz/info";

(async () => {
  try {
    const { data } = await axios.post(apiUrl, {
      type: {
        userPnl: {
          user: wallet,
        },
      },
    });
    console.log("✅ Response:", data);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
})();
