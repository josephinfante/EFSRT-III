import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			let table_exists;
			try {
				table_exists = await queryInterface.describeTable("departments");
			} catch (error) {
				table_exists = false;
			}

			if (!table_exists) {
				await queryInterface.createTable(
					"departments",
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
			await queryInterface.dropTable("departments", { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
};
