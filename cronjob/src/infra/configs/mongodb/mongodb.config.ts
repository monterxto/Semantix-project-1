export const mongodbConfig = {
  host: process.env.MONGO_HOST,
  db: process.env.MONGO_DB,
  opts: {
    authSource: "admin",
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  },
};
