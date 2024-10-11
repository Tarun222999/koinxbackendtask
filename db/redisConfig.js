
import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redisURI = process.env.REDIS_URI;
if (!redisURI) {
    throw new Error(redisURI);
}

export const redis = new Redis(process.env.REDIS_URI, {
    maxRetriesPerRequest: null
});

redis.on('connect', () => {
    console.log('Redis Connection Successfull')
})

redis.on('error', () => {
    console.log('error connection to redis')
})