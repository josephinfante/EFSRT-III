import { Router } from "express";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";

export class EmployeesRouter {
	static get routes(): Router {
		const router = Router();
		const service = new EmployeesService();
		const controller = new EmployeesController(service);

		router.post("/", controller.create.bind(controller));
		router.get("/", controller.findAll.bind(controller));
		router.delete("/:id", controller.delete.bind(controller));
		router.get("/:id", controller.findById.bind(controller));
		router.put("/:id", controller.update.bind(controller));

		return router;
	}
}
