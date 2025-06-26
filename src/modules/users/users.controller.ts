import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { UsersService } from "./users.service";

export class UsersController {
	private usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	
	findAll = tryCatch(async (req: Request, res: Response) => {
		const { page, limit } = req.query as { page: string; limit: string };
		const { items } = await this.usersService.findAll({ page, limit });
		res.render("users/list", { items });
	});

	
	formCreate = tryCatch(async (_req: Request, res: Response) => {
		res.render("users/create");
	});

	
	create = tryCatch(async (req: Request, res: Response) => {
		await this.usersService.create(req.body);
		res.redirect("/users");
	});

	findById = tryCatch(async (req: Request, res: Response) => {
		const user = await this.usersService.findById(req.params.id);
		res.render("users/detail", { user });
	});


	formEdit = tryCatch(async (req: Request, res: Response) => {
		const user = await this.usersService.findById(req.params.id);
		res.render("users/edit", { user });
	});


	update = tryCatch(async (req: Request, res: Response) => {
		await this.usersService.update(req.params.id, req.body);
		res.redirect("/users");
	});

	
	delete = tryCatch(async (req: Request, res: Response) => {
		await this.usersService.delete(req.params.id);
		res.redirect("/users");
	});
}

