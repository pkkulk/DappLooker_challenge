import axios from 'axios';
import { getAIInsight } from '../utils/geminiClient.js';
export const getWalletPnl = async(req,res)=>{
    const {wallet}=req.params;
    const {start,end}=req.query;
    try{
        if(!start || !end){
            return res.status(400).json({error:"start and end query parameters are required"});
        }
        const url="https://api.hyperliquid.xyz/info?type=pnlSummary&user=${wallet}";
        const {data}=await axios.get(url);
        const allData = data?.dailyPnl || [];

    const filtered = allData.filter((d) => d.day >= start && d.day <= end);
    if(!filtered.length){
        return res.status(404).json({error:"No PnL data found for the specified date range"});
    }
    const commulativePnl=10000;
    const daily=filtered.map((d)=>{
        const realized = d.realized_pnl_use || d.pnl || 0 ,
        const unrealized = d.unrealized_pnl_use || 0 ,
        const fees = d.fees_usd || d.fees || 0 ,
        const funding = d.funding_usd || d.funding || 0 ,
        const net = realized + unrealized - fees - funding,
        commulativePnl += totalPnl,
        return {
            date:d.day,
            realized_pnl_usd:realized,
            unrealized_pnl_usd:unrealized,
            fees_usd:fees,
            funding_usd:funding,
            total_pnl:net,
            commulative_pnl:commulativePnl,
            net_pnl_usd:Number(net.toFixed(2)),
            equity_usd:Number(commulativePnl.toFixed(2))
        };
    });



}