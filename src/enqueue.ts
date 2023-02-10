import { Queue, QueueEvents, Worker } from 'bullmq';
import Payload from './payload';
import { jobId, jobName, queueName, connection } from './constants';

async function main()
{
    const queue = new Queue<Payload, void>(queueName, { connection });

    console.log(`Resetting queue ${queueName}`);
    await queue.obliterate({ force: true, });
    await queue.resume();

    console.log(`Enqueueing job ${jobId}`);
    await queue.add(
        jobName,
        { hangFor: 10000, },
        { removeOnComplete: true, removeOnFail: true, jobId }
    );
}

main().catch(console.error);
