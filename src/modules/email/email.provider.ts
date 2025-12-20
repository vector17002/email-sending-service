import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

export class EmailProvider {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.smtp.host,
            port: env.smtp.port,
            secure: false,
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