const Redis = require("ioredis");

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("error", (err) => console.log("Redis clien error"));

module.exports = redisClient;
