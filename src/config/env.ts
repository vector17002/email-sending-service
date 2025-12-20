import * as dotenv from "dotenv";
dotenv.config();

export const env = {
    port: process.env.PORT || 3000,

    smtp: {
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT),
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
    },
};