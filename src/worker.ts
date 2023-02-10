import { Worker, Job } from 'bullmq';
import Payload from './payload';
import { jobId, jobName, queueName, connection } from './constants';

const worker = new Worker<Payload, void>(
    queueName,
    async (job, token): Promise<void> => {
        const { hangFor } = job.data;
        console.log(
            `starting job: jobId=${job.id}, data=${hangFor}, token=${token}`
        );

        if (hangFor > 0) {
            try {
                await job.update({ hangFor: 0 });
            } catch (err) {
                console.error(`${token}: Failed to update data`);
            }
        }

        const hangUntil = Date.now() + hangFor;
        console.log(`${token}: hang for ${hangFor}ms until ${new Date(hangUntil)}`);
        while (Date.now() < hangUntil);
        console.log(`${token}: Done hanging`);
    },
    {
        concurrency: 2,
        lockRenewTime: 499,
        lockDuration: 500,
        stalledInterval: 100,
        connection
    },
);

worker.on('error', (err) => {
    console.log('worker error', err);
});
