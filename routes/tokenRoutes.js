import exprees from "express";
import { getTokenInsights } from "../controllers/tokenController.js";
const router = exprees.Router();

router.get("/",(req,res)=>{
 res.send("token working");
});
router.post("/:id/insight", getTokenInsights);

export default router;