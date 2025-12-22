import type { Request, Response } from "express";
import { EmailService } from "./email.service.js";
import { logToFile } from "../../utils/logger.js";

const emailService = new EmailService();

export const sendEmail = async (req: Request, res: Response) => {
    try {
        await emailService.sendSingleEmail(req.body);
        logToFile("Email sent successfully to:" + req.body.to + "from:" + req.body.from);
        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error: any) {
        logToFile("Email failed to send to:" + req.body.to + "due to" + error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendBatchEmails = async (req: Request, res: Response) => {
    try {
        await emailService.sendBatchEmails(req.body.emails);
        logToFile("Emails queued successfully to:" + req.body.emails.length + "emails");
        res.status(202).json({
            success: true,
            message: "Emails queued successfully",
        });
    } catch (error: any) {
        logToFile("Emails failed to queue due to" + error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
