import express from "express";
import dotenv from 'dotenv';
import { getCoinData } from "./utils/coingeckoApi.js";
import connectDB from "./db/dbConfig.js";
import cron from 'node-cron';
import { fetchAndStoreData } from "./utils/storeStats.js";
import statRouter from './routes/statRouter.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

app.get("/", async (req, res) => {


    return res.json({
        routesAvailable: [
            "/api/stats", "api/deviation"
        ]
    })
})
app.use("/api", statRouter);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})


// Set up the cron job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Fetching data for Bitcoin, Matic Network, and Ethereum...');

    fetchAndStoreData('bitcoin');
    fetchAndStoreData('matic-network');
    fetchAndStoreData('ethereum');
});