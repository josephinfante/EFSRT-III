import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthRouter {
	static get routes(): Router {
		const router = Router();
		const service = new AuthService();
		const controller = new AuthController(service);

		router.post("/login", controller.login.bind(controller));

		return router;
	}
}
