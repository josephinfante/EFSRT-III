import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sequelize";
import { RolesModel } from "./roles-model";

export class UsersModel extends Model {
	public id!: string;
	public first_name!: string;
	public last_name!: string;
	public email!: string;
	public password!: string;
	public role_id!: string;
	public status!: string;
	public created_at!: number;
	public updated_at!: number | null;
}

UsersModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		role_id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			references: {
				model: "roles",
				key: "id",
			},
		},
		status: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.BIGINT,
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		sequelize: sequelize,
		modelName: "users",
		createdAt: false,
		updatedAt: false,
	},
);

UsersModel.belongsTo(RolesModel, { foreignKey: "role_id", targetKey: "id" });
RolesModel.hasMany(UsersModel, { foreignKey: "role_id", sourceKey: "id" });
