import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sequelize";
import { DepartmentsModel } from "./departments-model";

export class EmployeesModel extends Model {}

EmployeesModel.init(
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
		phone: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: null,
		},
		hire_at: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		position: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		salary: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		department_id: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			references: {
				model: "departments",
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
		modelName: "employees",
		createdAt: false,
		updatedAt: false,
	},
);

EmployeesModel.belongsTo(DepartmentsModel, { foreignKey: "department_id", targetKey: "id" });
DepartmentsModel.hasMany(EmployeesModel, { foreignKey: "department_id", sourceKey: "id" });
