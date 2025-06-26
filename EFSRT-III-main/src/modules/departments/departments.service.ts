import { ValidationError } from "../../errors/validation-error";
import { Department } from "../../interface/departments.interface";
import { DepartmentsModel } from "../../models/departments-model";
import { Generate } from "../../utils/data-generator";

export class DepartmentsService {
	async create(data: Omit<Department, "id" | "created_at" | "updated_at">): Promise<Department> {
		const { name, location } = data;
		if (!name) {
			throw new ValidationError("Name is required");
		}
		if (!location) {
			throw new ValidationError("Location is required");
		}

		const [department, created] = await DepartmentsModel.findOrCreate({
			where: { name, location },
			defaults: {
				id: Generate.id(),
				name,
				location,
				created_at: Date.now(),
				updated_at: null,
			},
		});

		if (!created) {
			throw new ValidationError("Department already exists");
		}

		return department;
	}
	async findAll(): Promise<Department[]> {
		const departments = await DepartmentsModel.findAll();
		return departments;
	}
}
