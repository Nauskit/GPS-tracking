const Redis = require('ioredis');
require('dotenv').config();

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const publisher = new Redis({
    host: redisHost,
    port: redisPort
})

const subscriber = new Redis({
    host: redisHost,
    port: redisPort,
})

publisher.on('connect', () => console.log("Publisher connected to Redis"));
subscriber.on('connect', () => console.log("Subscriber connected to Redis"))

publisher.on('error', (err) => console.log("Publisher redis error:", err));
subscriber.on('error', (err) => console.log("Subscriber redis error: ", err))

module.exports = { publisher, subscriber };