import { Worker } from "bullmq";
import { EmailProvider } from "./email.provider.js";
import redis from "../../utils/redisClient.js";
import { logToFile } from "../../utils/logger.js";

const provider = new EmailProvider();

new Worker(
    "email-queue",
    async job => {
        logToFile(`Processing job ${job.id}:` + job.data);
        const { to, subject, body } = job.data;

        try {
            await provider.sendMail(to, subject, body);
            logToFile(`Job ${job.id} completed successfully`);
        } catch (error) {
            logToFile(`Job ${job.id} failed:` + error);
            throw error;
        }
    },
    {
        connection: redis,
        concurrency: 5,
    }
);