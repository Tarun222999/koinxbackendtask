import express from "express";
import dotenv from 'dotenv';
dotenv.config()

import connectDB from "./db/dbConfig.js";
import statRouter from './routes/statRouter.js';
import cron from 'node-cron';
import { fetchAndStoreData } from "./utils/storeStats.js";
// import { redis } from "./db/redisConfig.js"
// import './jobs/workers/cryptoWorker.js'
// import { scheduleCryptoJobs } from "./jobs/scheduler/jobScheduler.js";






const app = express()
const PORT = process.env.PORT || 8000



connectDB()

app.get("/", async (req, res) => {
    return res.json({
        routesAvailable: [
            "/stats", "/deviation"
        ]
    })
})
app.use("/", statRouter);


//disabling bullmq as its maxing out redis requests
// // // Set up the cron job to run every 2 hours
// cron.schedule('0 */2 * * *', () => {
//     scheduleCryptoJobs();
// });

cron.schedule('0 */2 * * *', () => {
    console.log('Fetching data for Bitcoin, Matic Network, and Ethereum...');
    fetchAndStoreData('bitcoin');
    fetchAndStoreData('matic-network');
    fetchAndStoreData('ethereum');
});
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})





