import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			let table_exists;
			try {
				table_exists = await queryInterface.describeTable("employee_history");
			} catch (error) {
				table_exists = false;
			}

			if (!table_exists) {
				await queryInterface.createTable(
					"employee_history",
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
			await queryInterface.dropTable("employee_history", { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
};
