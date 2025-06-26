import fs from "fs";
import path from "path";

function pascalCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => (index === 0 ? match.toUpperCase() : match.toUpperCase()))
		.replace(/[_\s-]+/g, " ")
		.replace(/\s(.)/g, (match) => match.toUpperCase())
		.replace(/\s+/g, "")
		.replace(/^([a-z])/g, (match) => match.toUpperCase());
}

function snakeCase(str: string): string {
	return str
		.replace(/\s+/g, "_")
		.replace(/([a-z])([A-Z])/g, "$1_$2")
		.toLowerCase();
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error("❌ Please provide at least one name like 'users-model'");
	process.exit(1);
}

args.forEach((rawArg) => {
	const baseName = rawArg.replace(/-model$/, "");
	const className = pascalCase(baseName) + "Model";
	const modelName = snakeCase(baseName);
	const targetPath = path.resolve(`src/models/${rawArg}.ts`);

	const content = `
        import { DataTypes, Model } from "sequelize";
        import { sequelize } from "../connections/sequelize";

        export class ${className} extends Model {}

        ${className}.init(
            {
                id: {
                    type: DataTypes.CHAR(36),
                    allowNull: false,
                    primaryKey: true,
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
                modelName: "${modelName}",
                createdAt: false,
                updatedAt: false,
            },
        );
    `;

	if (fs.existsSync(targetPath)) {
		console.warn(`⚠️ File already exists, skipping: ${targetPath}`);
		return;
	}

	fs.writeFileSync(targetPath, content, "utf8");
	console.log(`✅ Created: ${targetPath}`);
});
