import { Router } from "express";
import { sendBatchEmails, sendEmail } from "./email.controller.js";

const router = Router();

router.post("/send", sendEmail);
router.post("/send-batch", sendBatchEmails);

export default router;