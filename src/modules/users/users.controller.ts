import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { UsersService } from "./users.service";

export class UsersController {
	private usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	// Mostrar lista de usuarios
	findAll = tryCatch(async (_req: Request, res: Response) => {
		const { page = "1", limit = "10" } = _req.query as { page: string; limit: string };
		const { items: users } = await this.usersService.findAll({ page, limit });
		res.render("users/list", { title: "Lista de Usuarios", users });
	});

	// Mostrar formulario de creación
	formCreate = tryCatch(async (_req: Request, res: Response) => {
		res.render("users/create", { title: "Crear Usuario" });
	});

	// Crear usuario (POST)
	create = tryCatch(async (req: Request, res: Response) => {
		await this.usersService.create(req.body);
		res.redirect("/users");
	});

	// Mostrar detalles de usuario
	findById = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const user = await this.usersService.findById(id);
		res.render("users/detail", { title: "Detalle de Usuario", user });
	});

	// Mostrar formulario de edición
	formEdit = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		const user = await this.usersService.findById(id);
		res.render("users/edit", { title: "Editar Usuario", user });
	});

	// Actualizar usuario
	update = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		await this.usersService.update(id, req.body);
		res.redirect("/users");
	});

	// Eliminar usuario
	delete = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params;
		console.log(id);
		await this.usersService.delete(id);
		res.redirect("/users");
	});
}
