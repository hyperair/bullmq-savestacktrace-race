import { Queue } from 'bullmq';
import { jobId, jobName, queueName, connection } from './constants';

const queue = new Queue(queueName, { connection });
setInterval(async () => {
    const job = await queue.getJob(jobId);
    if (job) {
        const state = await job.getState();
        console.log(`job ${jobId} exists but has state ${state}`);
    } else {
        console.log(`job ${jobId} does not exist`);
    }
}, 1000);
