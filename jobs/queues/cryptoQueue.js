import { Queue } from "bullmq";
import { redis } from "../../db/redisConfig.js";


export const cryptoQueue = new Queue('crypto-fetch-queue', {
    connection: redis
})

cryptoQueue.on('progress', () => {
    console.log('queuing in progress')
})


export async function checkQueueStatus() {
    try {
        // Get job counts
        const jobCounts = await cryptoQueue.getJobCounts();

        console.log(`Jobs in queue:`);
        console.log(`Waiting: ${jobCounts.waiting}`);
        console.log(`Active: ${jobCounts.active}`);
        console.log(`Completed: ${jobCounts.completed}`);
        console.log(`Failed: ${jobCounts.failed}`);
        console.log(`Delayed: ${jobCounts.delayed}`);
    } catch (error) {
        console.error('Error fetching queue status:', error.message);
    }
}

