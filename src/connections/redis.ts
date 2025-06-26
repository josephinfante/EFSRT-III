import Redis from "ioredis";
import { environment } from "../config/environment";

const redis = new Redis({
	port: environment.REDIS_PORT,
	host: environment.REDIS_HOST,
	password: environment.REDIS_PASSWORD,
	username: environment.REDIS_USERNAME,
});

export default redis;
