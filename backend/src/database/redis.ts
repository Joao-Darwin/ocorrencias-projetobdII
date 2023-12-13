import {
  RedisClientType,
  createClient
} from "redis";

const clientPassword = process.env.REDIS_CLIENT_PASSWORD;
const clientHost = process.env.REDIS_CLIENT_HOST;
const clientPort = parseInt(process.env.REDIS_CLIENT_PORT ?? "0");

const redis: RedisClientType = createClient({
  password: clientPassword,
  socket: {
    host: clientHost,
    port: clientPort,
  },
});

const connect = async () => {
  redis.on("error", (err: any) => console.log("Redis Client Error", err));
  await redis.connect();
};

connect();

export default redis;
