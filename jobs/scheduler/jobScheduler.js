
import { cryptoQueue } from "../queues/cryptoQueue.js";


export const scheduleCryptoJobs = async () => {
    try {
        console.log('at scheduler')
        cryptoQueue.add('fetch-bitcoin', { coinId: 'bitcoin' });
        cryptoQueue.add('fetch-matic', { coinId: 'matic-network' });
        cryptoQueue.add('fetch-ethereum', { coinId: 'ethereum' });
        console.log('queued tasks at scheduler')
    } catch (error) {
        console.log('error')
    }

}