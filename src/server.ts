import express, { Application, Router } from "express";
import cors from "cors";
import { environment } from "./config/environment";
import path from "path";
import { errorMiddleware } from "./middlewares/error-middleware";
import expressLayouts from "express-ejs-layouts";



interface ServerOption {
	port?: number;
	routes: Router;
}

export class Server {
	public readonly app: Application = express();
	public readonly port: number;
	public readonly routes: Router;

	constructor(options: ServerOption) {
		const { port = 3000, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async start() {
	    
		this.app.set("trust proxy", true);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.set("view engine", "ejs");
		this.app.use(expressLayouts);
		this.app.set("views", path.join(__dirname, "views"));
		this.app.set("layout", "partials/layout");
		this.app.use(express.static(path.join(__dirname, "public")));
		this.app.use(
			cors({
				origin: (origin, callback) => {
					if (!origin) return callback(null, true);
					if (environment.ACCEPTED_ORIGINS.includes(origin)) {
						callback(null, true);
						return;
					}
					return callback(new Error("Origin not allowed by CORS."));
				},
				credentials: true,
			}),
		);
		this.app.use(this.routes);
		this.app.use(errorMiddleware);
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
