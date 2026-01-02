import { Queue } from "bullmq";
import redis from "../../utils/redisClient.js";

export const emailDLQ = new Queue("email-dlq", {
    connection: redis,
    defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: false,
    },
});