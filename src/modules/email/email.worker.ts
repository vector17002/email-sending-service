import { Worker } from "bullmq";
import { EmailProvider } from "./email.provider.js";
import redis from "../../utils/redisClient.js";
import { logToFile } from "../../utils/logger.js";
import { emailDLQ } from "./email.dlq.js";

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
).on("failed", async (job, error) => {
    if (!job) {
        logToFile("Job not found");
        return;
    }

    logToFile(`Job ${job.id} failed:` + error);
    const attemptsMade = job.attemptsMade;
    const maxAttempts = job.opts.attempts ?? 1;

    if (attemptsMade < maxAttempts) {
        logToFile(`Job ${job.id} will be retried`);
        return;
    }

    logToFile(`Job ${job.id} will be moved to DLQ`);
    await emailDLQ.add("dead-email", {
        originalJobId: job.id,
        originalJobData: job.data,
        error: error.message,
        failedAt: new Date().toISOString(),
    });
})