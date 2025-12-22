import { logToFile } from "../../utils/logger.js";
import { EmailProvider } from "./email.provider.js";
import { emailQueue } from "./email.queue.js";

export class EmailService {
    private provider = new EmailProvider();

    async sendSingleEmail(payload: {
        to: string;
        subject: string;
        body: string;
    }) {
        const { to, subject, body } = payload;

        if (!to || !subject || !body) {
            logToFile("Invalid email payload");
            throw new Error("Invalid email payload");
        }

        return this.provider.sendMail(to, subject, body);
    }

    async sendBatchEmails(emails: any[]) {
        if (!Array.isArray(emails) || emails.length === 0) {
            logToFile("Invalid batch payload");
            throw new Error("Invalid batch payload");
        }

        const jobs = emails.map(email => ({
            name: "send-email",
            data: email,
        }));

        logToFile(`Adding ${jobs.length} jobs to queue`);
        await emailQueue.addBulk(jobs);
        logToFile("Jobs added to queue successfully");
    }
}