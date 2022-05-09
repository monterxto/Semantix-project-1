export const options = {
  hostname: process.env.API_SEMANTIX_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.API_SEMANTIX_USER + ":" + process.env.API_SEMANTIX_PASS
    ).toString("base64")}`,
  },
};