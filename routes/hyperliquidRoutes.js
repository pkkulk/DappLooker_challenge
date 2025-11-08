import express from "express";
const router = express.Router();

router.get("/:wallet/pnl", getWalletPnL);

export default router;