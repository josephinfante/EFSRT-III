import { environment } from "./src/config/environment";
import { ServerRouter } from "./src/router";
import { Server } from "./src/server";
(() => {
	main();
})();

async function main() {
	new Server({
		port: environment.PORT,
		routes: ServerRouter.routes,
	}).start();
}
