import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			let table_exists;
			try {
				table_exists = await queryInterface.describeTable("roles");
			} catch (error) {
				table_exists = false;
			}

			if (!table_exists) {
				await queryInterface.createTable(
					"roles",
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
			await queryInterface.dropTable("roles", { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
};
