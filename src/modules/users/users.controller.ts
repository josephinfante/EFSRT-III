import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { UsersService } from "./users.service";

export class UsersController {
	private usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	create = tryCatch(async (req: Request, res: Response) => {
		const user = await this.usersService.create(req.body);
		res.status(201).json(user);
	});

	findAll = tryCatch(async (req: Request, res: Response) => {
		const { page, limit } = req.query as { page: string; limit: string };
		const { items, count, totalPages, hasNextPage } = await this.usersService.findAll({ page, limit });
		res.status(200).json({ items, count, totalPages, hasNextPage });
	});

	delete = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.usersService.delete(id);
		res.status(200).json({ message: "User deleted successfully" });
	});

	findById = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const user = await this.usersService.findById(id);
		res.status(200).json(user);
	});

	update = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const user = await this.usersService.update(id, req.body);
		res.status(200).json(user);
	});
}





