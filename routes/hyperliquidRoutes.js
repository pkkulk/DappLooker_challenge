import express from "express";
import { getWalletPnL } from "../controllers/hyperliquidController.js";
const router = express.Router();

router.get("/:wallet/pnl", getWalletPnL);

export default router;