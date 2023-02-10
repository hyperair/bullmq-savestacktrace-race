import { SandboxedJob } from 'bullmq';

const processor = async (job: SandboxedJob, ...args: any[]): Promise<void> => {
    const { hangFor } = job.data;
    console.log(`starting job: jobId=${job.id} data=${hangFor}`);

    if (hangFor > 0) {
        await job.update({ hangFor: 0 });
    }

    const hangUntil = Date.now() + hangFor;
    console.log(`hang for ${hangFor}ms until ${new Date(hangUntil)}`);
    while (Date.now() < hangUntil);
    console.log('Done hanging');
};

export default processor;
