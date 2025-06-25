import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sequelize";
import { EmployeesModel } from "./employees-model";

export class EmployeeHistoryModel extends Model {
	public id!: string;
	public employee_id!: string;
	public change_date!: number;
	public old_position!: string | null;
	public new_position!: string | null;
	public notes!: string | null;
	public created_at!: number;
	public updated_at!: number | null;
}

EmployeeHistoryModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		employee_id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			references: {
				model: "employees",
				key: "id",
			},
		},
		change_date: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		old_position: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
		},
		new_position: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: null,
		},
		notes: {
			type: DataTypes.TEXT,
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
		modelName: "employee_history",
		createdAt: false,
		updatedAt: false,
	},
);

EmployeeHistoryModel.belongsTo(EmployeesModel, { foreignKey: "employee_id", targetKey: "id" });
EmployeesModel.hasMany(EmployeeHistoryModel, { foreignKey: "employee_id", sourceKey: "id" });
