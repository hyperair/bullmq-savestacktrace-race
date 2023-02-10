import { QueueEvents } from 'bullmq';
import { jobId, jobName, queueName, connection } from './constants';

const queueEvents = new QueueEvents(queueName, { connection });

const events = [
    'active',
    'added',
    'cleaned',
    'completed',
    'delayed',
    'drained',
    'duplicated',
    'error',
    'failed',
    'paused',
    'progress',
    'removed',
    'resumed',
    'retries-exhausted',
    'stalled',
    'waiting',
    'waiting-children',
] as const;

for (const key of events) {
    queueEvents.on(key, (args: unknown, id: string) => {
        console.log(`event [${key}]`, { args, id });
    });
}
