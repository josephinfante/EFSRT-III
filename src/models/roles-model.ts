import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sequelize";

export class RolesModel extends Model {}

RolesModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		name: {
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
		modelName: "roles",
		createdAt: false,
		updatedAt: false,
	},
);
