import axios from "axios";
import { getAIInsight } from "../utils/geminiClient.js";

export const getTokenInsights= async(req,res)=>{
const {id} =req.params;
const {vs_currency="usd" ,history_days=30}=req.body;
 try{
     const url= `https://api.coingecko.com/api/v3/coins/${id}`;
     const {data}=await axios.get(url);
     const tokenData ={
        id:data.id,
        symbol:data.symbol,
        name:data.name,
        market_data:{
                current_price_usd: data.market_data.current_price.usd,
            market_cap_usd: data.market_data.market_cap.usd,
        total_volume_usd: data.market_data.total_volume.usd,
        price_change_percentage_24h:
          data.market_data.price_change_percentage_24h,
        },
     };
     const prompt = `
    Analyze token ${tokenData.name} (${tokenData.symbol.toUpperCase()}) market performance based on:
    - Current Price: ${tokenData.market_data.current_price_usd} USD
    - Market Cap: ${tokenData.market_data.market_cap_usd}
    - 24h Change: ${tokenData.market_data.price_change_percentage_24h}%
    Give a short reasoning and overall sentiment (Bullish, Bearish, or Neutral).
    Return ONLY valid JSON like this:
    {
      "reasoning": "short explanation",
      "sentiment": "Bullish/Bearish/Neutral"
    }`;
     const insight = await getAIInsight(prompt);

     res.status(200).json({
      source:"coingecko",
      token:tokenData,
      insight,
      model :{provider:"google-gemini",model:"gemini-2.0-flash"},
     });
 }
 catch (error) {
    console.error("Token Insight Error:", error.message);
    res.status(500).json({ error: "Failed to fetch token data or AI insight." });
  }
};
export default getTokenInsights;