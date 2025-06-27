import { Router } from "express";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

export class UsersRouter {
	static get routes(): Router {
		const router = Router();
		const service = new UsersService();
		const controller = new UsersController(service);

		router.get("/", controller.findAll); // Lista
		router.get("/create", controller.formCreate); // Form crear
		router.post("/", controller.create); // POST crear
		router.get("/:id", controller.findById); // Detalle
		router.get("/:id/edit", controller.formEdit); // Form editar
		router.post("/:id", controller.update); // POST editar
		router.post("/:id/delete", controller.delete); // POST eliminar

		return router;
	}
}
