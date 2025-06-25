import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sequelize";

export class DepartmentsModel extends Model {
	public id!: string;
	public name!: string;
	public location!: string | null;
	public created_at!: number;
	public updated_at!: number | null;
}

DepartmentsModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
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
		modelName: "departments",
		createdAt: false,
		updatedAt: false,
	},
);
