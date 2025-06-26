import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			let table_exists;
			try {
				table_exists = await queryInterface.describeTable("employees");
			} catch (error) {
				table_exists = false;
			}

			if (!table_exists) {
				await queryInterface.createTable(
					"employees",
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
						createdAt: {
							type: DataTypes.BIGINT,
							allowNull: false,
							field: "created_at",
						},
						updatedAt: {
							type: DataTypes.BIGINT,
							allowNull: true,
							field: "updated_at",
							defaultValue: null,
						},
					},
					{ transaction },
				);
			}

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable("employees", { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
};
