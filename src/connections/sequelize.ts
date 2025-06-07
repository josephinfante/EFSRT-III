import { Sequelize } from "sequelize";
import { environment } from "../config/environment";

export const sequelize = new Sequelize(environment.DB_NAME, environment.DB_USERNAME, environment.DB_PASSWORD, {
	dialect: environment.DB_DIALECT,
	host: environment.DB_HOST,
	port: environment.DB_PORT,
	pool: {
		min: environment.DB_POOL_SIZE_MIN,
		max: environment.DB_POOL_SIZE_MAX,
		acquire: environment.DB_POOL_ACQUIRE,
		idle: environment.DB_POOL_IDLE,
	},
	logging: environment.DB_POOL_LOGGING,
	dialectOptions: {
		decimalNumbers: true,
	},
});
