import type { Request, Response } from "express";
import { EmailService } from "./email.service.js";

const emailService = new EmailService();

export const sendEmail = async (req: Request, res: Response) => {
    try {
        await emailService.sendSingleEmail(req.body);

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};