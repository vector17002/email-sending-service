import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import { logToFile } from './logger.js';

dotenv.config();

const redisFunction = () => {
    if (process.env.REDIS_URL) {
        logToFile('Redis connection successful');
        return new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: null
        });
    }
    logToFile('Redis connection failed');
    throw new Error('Redis connection failed');
}

const redis = redisFunction();
export default redis;
