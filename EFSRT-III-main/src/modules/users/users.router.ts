import { Router } from "express";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

export class UsersRouter {
	static get routes(): Router {
		const router = Router();
		const service = new UsersService();
		const controller = new UsersController(service);

		router.post("/", controller.create.bind(controller));
		router.get("/", controller.findAll.bind(controller));
		router.delete("/:id", controller.delete.bind(controller));
		router.get("/:id", controller.findById.bind(controller));
		router.put("/:id", controller.update.bind(controller));

		return router;
	}
}
