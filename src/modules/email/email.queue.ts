import { Queue } from "bullmq";
import redis from "../../utils/redisClient.js";

export const emailQueue = new Queue("email-queue", {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});