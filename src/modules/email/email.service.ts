import { EmailProvider } from "./email.provider.js";

export class EmailService {
    private provider = new EmailProvider();

    async sendSingleEmail(payload: {
        to: string;
        subject: string;
        body: string;
    }) {
        const { to, subject, body } = payload;

        if (!to || !subject || !body) {
            throw new Error("Invalid email payload");
        }

        return this.provider.sendMail(to, subject, body);
    }
}