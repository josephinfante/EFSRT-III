import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { EmployeesService } from "./employees.service";

export class EmployeesController {
	private employeesService: EmployeesService;

	constructor(employeesService: EmployeesService) {
		this.employeesService = employeesService;
	}

	create = tryCatch(async (req: Request, res: Response) => {
		const employee = await this.employeesService.create(req.body);
		res.status(201).json(employee);
	});

	findAll = tryCatch(async (req: Request, res: Response) => {
		const { page, limit } = req.query as { page: string; limit: string };
		const { items, count, totalPages, hasNextPage } = await this.employeesService.findAll({ page, limit });
		res.status(200).json({ items, count, totalPages, hasNextPage });
	});

	delete = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.employeesService.delete(id);
		res.status(200).json({ message: "Employee deleted successfully" });
	});

	findById = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const employee = await this.employeesService.findById(id);
		res.status(200).json(employee);
	});

	update = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const employee = await this.employeesService.update(id, req.body);
		res.status(200).json(employee);
	});
}
