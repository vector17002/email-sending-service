import fs from 'fs';
import path from 'path';

export const logToFile = (message: string) => {
    const logFilePath = path.join(process.cwd(), 'logs.txt');
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};
