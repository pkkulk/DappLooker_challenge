import express from "express"
import dotenv from "dotenv"
import tokenRoutes from "./routes/tokenRoutes.js"
import hyperliquidRoutes from "./routes/hyperliquidRoutes.js";

import bodyParser from "body-parser"

dotenv.config();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
res.send("Api is running successfully");
});

app.use("/api/token",tokenRoutes);
app.use("/api/hyperliquid",hyperliquidRoutes);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
 console.log("server running on port ${PORT}");
});
