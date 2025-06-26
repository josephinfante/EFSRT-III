import { Router } from "express";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";

export class DepartmentsRouter {
	static get routes(): Router {
		const router = Router();
		const service = new DepartmentsService();
		const controller = new DepartmentsController(service);

		router.post("/", controller.create.bind(controller));
		router.get("/", controller.findAll.bind(controller));

		return router;
	}
}
