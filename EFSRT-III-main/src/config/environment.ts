import "dotenv/config";

export const environment = {
	// SERVER VARIABLES
	NODE_ENV: process.env.NODE_ENV || "development",
	ENV: process.env.ENV || "development",
	PORT: Number(process.env.PORT) || 3000,
	ACCEPTED_ORIGINS: process.env.ACCEPTED_ORIGINS?.split(",") || ["http://localhost:3000"],
	JWT_SECRET: process.env.JWT_SECRET || "secret",
	SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
	CLIENT_URL: process.env.CLIENT_URL || "",
	HOST_URL: process.env.HOST_URL || "http://localhost:3000",
	COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
	ROOT_ADMIN_EMAIL: process.env.ROOT_ADMIN_EMAIL || "",

	// DATABASE VARIABLES
	DB_NAME: process.env.DB_NAME || "",
	DB_USERNAME: process.env.DB_USERNAME || "",
	DB_PASSWORD: process.env.DB_PASSWORD || "",
	DB_DIALECT: (process.env.DB_DIALECT as "mysql" | "postgres" | "sqlite" | "mariadb") || "mysql",
	DB_HOST: process.env.DB_HOST || "",
	DB_PORT: Number(process.env.DB_PORT) || 0,
	DB_POOL_SIZE_MIN: Number(process.env.DB_POOL_SIZE_MIN) || 0,
	DB_POOL_SIZE_MAX: Number(process.env.DB_POOL_SIZE_MAX) || 5,
	DB_POOL_ACQUIRE: Number(process.env.DB_POOL_ACQUIRE) || 30000,
	DB_POOL_IDLE: Number(process.env.DB_POOL_IDLE) || 10000,
	DB_POOL_LOGGING: process.env.DB_POOL_LOGGING == "true" ? console.log : false,

	REDIS_HOST: process.env.REDIS_HOST || "localhost",
	REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
	REDIS_USERNAME: process.env.REDIS_USERNAME || "",
};
