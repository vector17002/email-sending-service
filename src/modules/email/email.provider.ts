import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

export class EmailProvider {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.smtp.host,
            port: env.smtp.port,
            secure: env.smtp.port === 465, // true for port 465 (SMTPS), false for 587 or 25 (STARTTLS)
            auth: {
                user: env.smtp.user,
                pass: env.smtp.pass,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        return this.transporter.sendMail({
            from: env.smtp.user,
            to,
            subject,
            html,
        });
    }
}