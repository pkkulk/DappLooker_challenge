import exprees from "express";
import { getTokenInsights } from "../controllers/tokenController.js";
const router = exprees.Router();
// 🧠 Browser-friendly GET route (uses default params)

router.get("/:id/insight", (req, res) => {
  // Simulate POST body defaults safely
  req.body = { vs_currency: "usd", history_days: 30 };
  getTokenInsights(req, res);
})
router.post("/:id/insight", getTokenInsights);

export default router;