import cron from 'node-cron';
import * as fs from 'fs';
import * as path from 'path';

const downloadsDir = path.join(__dirname + '../../../../', 'downloads');

const CleanupDownloads = (filePath: string, job: cron.ScheduledTask) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${filePath}: ${err.message}`);
        } else {
            console.log(`Deleted file: ${filePath}`);
            job.stop(); // Stop the cron job after the file is deleted
        }
    });
};

export { CleanupDownloads };
