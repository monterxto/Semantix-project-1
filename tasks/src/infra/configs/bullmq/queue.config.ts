export const queueConfig = {
  name: process.env.BULLMQ_QUEUE_NAME,
  opts: {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    defaultJobOptions: {
      removeOnFail: true,
      attempts: 3,
      timeout: 5000,
    },
  },
};
