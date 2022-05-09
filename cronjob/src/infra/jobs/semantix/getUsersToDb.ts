import { Queue, QueueOptions, QueueScheduler, RepeatOptions } from "bullmq";

const opt: QueueOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: 1000,
    attempts: 3,
    timeout: 1000,
    delay: 1000,
  },
};


async function start() {
  // const myQueueScheduler = new QueueScheduler('foo', {connection: opt.connection});
  const myQueue = new Queue("foo", opt);
  // myQueue.
  // await myQueue.obliterate();
  await myQueue.removeRepeatable("myJobName3", {cron: "*/2 * * * * *"});
  // await addJobs(myQueue);
  // console.log((await myQueue.getRepeatableJobs()).length);
  let queue = new Queue("foo", opt);
  await queue.removeRepeatable("myJobName3", {cron: "*/1 * * * * *"});
  // console.log((await queue.getRepeatableJobs()).length);
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('get active', await queue.getWaitingCount());
    // console.log('todos', (await queue.getActiveCount).length);
    console.log('repetidos', (await queue.getRepeatableJobs()).length);
  }
}

async function addJobs(queue: Queue<any, any, string>) {
  // await myQueue.add("myJobName", { foo: "1" }, { repeat: { cron: "*/5 * * * * *" } });
  await queue.add("myJobName3", { uepa: "3" }, { repeat: { cron: "*/2 * * * * *"}});
  await queue.add("myJobName4", { uepa: "23123" });
}
// start();
new QueueScheduler('foo', {connection: opt.connection});