import Redis from "ioredis";

const REDIS = new Redis(process.env.REDIS_URL);

export default REDIS;
