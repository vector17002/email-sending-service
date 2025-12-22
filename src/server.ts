import app from "./app.js";
import { env } from "./config/env.js";
import "./modules/email/email.worker.js";

app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});