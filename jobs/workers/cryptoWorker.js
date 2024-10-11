import { Worker } from 'bullmq'
import { fetchAndStoreData } from '../../utils/storeStats.js';
import { redis } from '../../db/redisConfig.js';
import { checkQueueStatus } from '../queues/cryptoQueue.js';
import { cryptoProcessor } from '../processors/cryptoProcessor.js';

export const cryptoWorker = new Worker('crypto-fetch-queue', async (job) => {
    const { coinId } = job.data;

    try {

        await cryptoProcessor(coinId)
        await checkQueueStatus()

    } catch (error) {
        console.error(`Failed to process job for ${coinId}:`, error.message);
    }
}, {
    connection: redis
})

cryptoWorker.on('failed', (job, error) => {
    console.error(`Job ${job.id} failed with error ${error.message}`);
});