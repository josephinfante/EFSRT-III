import { environment } from "./environment";

const sequelizeConfig = {
	development: {
		username: environment.DB_USERNAME,
		password: environment.DB_PASSWORD,
		database: environment.DB_NAME,
		host: environment.DB_HOST,
		port: environment.DB_PORT,
		dialect: environment.DB_DIALECT,
		seederStorage: "sequelize",
	},
	test: {
		username: environment.DB_USERNAME,
		password: environment.DB_PASSWORD,
		database: environment.DB_NAME,
		host: environment.DB_HOST,
		port: environment.DB_PORT,
		dialect: environment.DB_DIALECT,
		seederStorage: "sequelize",
	},
	production: {
		username: environment.DB_USERNAME,
		password: environment.DB_PASSWORD,
		database: environment.DB_NAME,
		host: environment.DB_HOST,
		port: environment.DB_PORT,
		dialect: environment.DB_DIALECT,
		seederStorage: "sequelize",
	},
};
export default sequelizeConfig;
module.exports = sequelizeConfig;
