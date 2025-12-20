import express from "express";
import emailRoutes from "./modules/email/email.routes.js";

const app = express();

app.use(express.json());
app.use("/email", emailRoutes);

export default app;