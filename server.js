import express from "express";
import dotenv from 'dotenv';
dotenv.config()

import connectDB from "./db/dbConfig.js";
import { redis } from "./db/redisConfig.js"
import statRouter from './routes/statRouter.js';
import cron from 'node-cron';
import { scheduleCryptoJobs } from "./jobs/scheduler/jobScheduler.js";



const app = express()
const PORT = process.env.PORT || 8000

import './jobs/workers/cryptoWorker.js'

connectDB()

app.get("/", async (req, res) => {
    return res.json({
        routesAvailable: [
            "/stats", "/deviation"
        ]
    })
})
app.use("/", statRouter);

// // Set up the cron job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    scheduleCryptoJobs();
});


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})





