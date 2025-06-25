import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { DepartmentsService } from "./departments.service";

export class DepartmentsController {
	private departmentsService: DepartmentsService;

	constructor(departmentsService: DepartmentsService) {
		this.departmentsService = departmentsService;
	}

	create = tryCatch(async (req: Request, res: Response) => {
		const department = await this.departmentsService.create(req.body);
		res.status(201).json(department);
	});

	findAll = tryCatch(async (_req: Request, res: Response) => {
		const departments = await this.departmentsService.findAll();
		res.status(200).json(departments);
	});
}
