import { ValidationError } from "../../errors/validation-error";
import { User } from "../../interface/users.interface";
import { UsersModel } from "../../models/users-model";
import { Generate } from "../../utils/data-generator";

export class UsersService {
	async create(data: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
		const { first_name, last_name, email, password, role_id, status } = data;

		if (!first_name) throw new ValidationError("First name is required");
		if (!last_name) throw new ValidationError("Last name is required");
		if (!email) throw new ValidationError("Email is required");
		if (!password) throw new ValidationError("Password is required");
		if (!role_id) throw new ValidationError("Role ID is required");

		const [user, created] = await UsersModel.findOrCreate({
			where: { email },
			defaults: {
				id: Generate.id(),
				first_name,
				last_name,
				email,
				password,
				role_id,
				status: status || "active",
				created_at: Date.now(),
				updated_at: null,
			},
		});

		if (!created) throw new ValidationError("User already exists");

		return user;
	}

	async findAll(query: {
		page: string;
		limit: string;
	}): Promise<{ items: User[]; count: number; totalPages: number; hasNextPage: boolean }> {
		const size = Math.max(1, query?.limit ? Number(query.limit) : 10);
		const page = Math.max(1, query?.page ? Number(query.page) : 1);
		const offset = (page - 1) * size;

		const { count, rows } = await UsersModel.findAndCountAll({
			order: [["created_at", "DESC"]],
			offset,
			limit: size,
		});

		const totalPages = Math.ceil(count / size);
		const hasNextPage = page < totalPages;

		return { items: rows, count, totalPages, hasNextPage };
	}

	async findById(id: string): Promise<User> {
		if (!id) throw new ValidationError("ID is required");

		const user = await UsersModel.findOne({ where: { id } });
		if (!user) throw new ValidationError("User not found");

		return user;
	}

	async update(id: string, data: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
		if (!id) throw new ValidationError("ID is required");

		const user = await UsersModel.findOne({ where: { id } });
		if (!user) throw new ValidationError("User not found");

		if (data.first_name && data.first_name !== user.first_name) {
			user.set("first_name", data.first_name);
		}

		if (data.last_name && data.last_name !== user.last_name) {
			user.set("last_name", data.last_name);
		}

		if (data.email && data.email !== user.email) {
			const emailExists = await UsersModel.findOne({ where: { email: data.email } });
			if (emailExists) throw new ValidationError("Email is already in use");
			user.set("email", data.email);
		}

		if (data.password && data.password !== user.password) {
			user.set("password", data.password);
		}

		if (data.role_id && data.role_id !== user.role_id) {
			user.set("role_id", data.role_id);
		}

		if (data.status && data.status !== user.status) {
			user.set("status", data.status);
		}

		user.set("updated_at", Date.now());

		await user.save();

		return user;
	}

	async delete(id: string): Promise<void> {
		if (!id) throw new ValidationError("ID is required");

		const user = await UsersModel.findOne({ where: { id } });
		if (!user) throw new ValidationError("User not found");

		await user.destroy();
	}
}
