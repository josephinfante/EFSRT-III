import { execSync } from "child_process";

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error("❌ Please provide at least one migration file name.");
	process.exit(1);
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateMigrations() {
	try {
		for (const file of args) {
			execSync(`npx sequelize-cli migration:generate --name ${file}`, { stdio: "inherit" });
			console.log(`✅ Migration generated for: ${file}`);

			await delay(500);
		}
	} catch (error) {
		console.error("❌ Error generating migrations:", error);
	}
}

generateMigrations();
