import axios from "axios";
import fs from "fs";
import path from "path";

export const getWalletPnL = async (req, res) => {
  const { wallet } = req.params;
  const { start, end } = req.query;

  try {
    if (!wallet) return res.status(400).json({ error: "Wallet address required." });
    if (!start || !end) return res.status(400).json({ error: "Provide start & end dates." });

    const apiUrl = "https://api.hyperliquid.xyz/info";
    let pnlData = [];

    try {
      const { data } = await axios.post(
        apiUrl,
        { type: { userPnl: { user: wallet } } },
        { headers: { "Content-Type": "application/json" } }
      );
      pnlData = data?.userPnl?.daily || [];
    } catch {
      const file = path.resolve("data/hyperliquid_pnl.json");
      pnlData = JSON.parse(fs.readFileSync(file, "utf-8"));
    }

    const filtered = pnlData.filter((d) => d.day >= start && d.day <= end);
    if (!filtered.length) return res.status(404).json({ error: "No PnL data for range." });

    let equity = 10000;
    const daily = filtered.map((d) => {
      const realized = d.realized_pnl_usd ?? d.pnl ?? 0;
      const unrealized = d.unrealized_pnl_usd ?? 0;
      const fees = d.fees_usd ?? 0;
      const funding = d.funding_usd ?? 0;
      const net = realized + unrealized - fees + funding;
      equity += net;
      return {
        date: d.day,
        realized_pnl_usd: +realized.toFixed(2),
        unrealized_pnl_usd: +unrealized.toFixed(2),
        fees_usd: +fees.toFixed(2),
        funding_usd: +funding.toFixed(2),
        net_pnl_usd: +net.toFixed(2),
        equity_usd: +equity.toFixed(2),
      };
    });

    const summary = daily.reduce(
      (acc, d) => {
        acc.total_realized_usd += d.realized_pnl_usd;
        acc.total_unrealized_usd += d.unrealized_pnl_usd;
        acc.total_fees_usd += d.fees_usd;
        acc.total_funding_usd += d.funding_usd;
        acc.net_pnl_usd += d.net_pnl_usd;
        return acc;
      },
      {
        total_realized_usd: 0,
        total_unrealized_usd: 0,
        total_fees_usd: 0,
        total_funding_usd: 0,
        net_pnl_usd: 0,
      }
    );
    Object.keys(summary).forEach((k) => (summary[k] = +summary[k].toFixed(2)));

    res.json({
      wallet,
      start,
      end,
      daily,
      summary,
      diagnostics: {
        data_source: "hyperliquid_api",
        last_api_call: new Date().toISOString(),
        notes: "PnL aggregated using daily close prices",
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
