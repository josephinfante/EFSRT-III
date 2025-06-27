import { ValidationError } from "../../errors/validation-error";
import { Employee } from "../../interface/employees.interface";
import { DepartmentsModel } from "../../models/departments-model";
import { EmployeesModel } from "../../models/employees-model";
import { Generate } from "../../utils/data-generator";

export class EmployeesService {
	async create(data: Omit<Employee, "id" | "created_at" | "updated_at">): Promise<Employee> {
		const { first_name, last_name, email, phone, hire_at, position, salary, department_id } = data;
		if (!first_name) {
			throw new ValidationError("First name is required");
		}
		if (!last_name) {
			throw new ValidationError("Last name is required");
		}
		if (!email) {
			throw new ValidationError("Email is required");
		}
		if (!phone) {
			throw new ValidationError("Phone is required");
		}
		if (!hire_at) {
			throw new ValidationError("Hire date is required");
		}
		if (!position) {
			throw new ValidationError("Position is required");
		}
		if (!salary) {
			throw new ValidationError("Salary is required");
		}
		if (!department_id) {
			throw new ValidationError("Department is required");
		}

				const [employee, created] = await EmployeesModel.findOrCreate({
			where: { email },
			defaults: {
				id: Generate.id(),
				first_name,
				last_name,
				email,
				phone,
				hire_at,
				position,
				salary,
				department_id,
				status: "active",
				created_at: Date.now(),
				updated_at: null,
			},
		});

		if (!created) {
			throw new ValidationError("Employee already exists");
		}

		return employee;
	}

	async findAll(query: {
		page: string;
		limit: string;
		}): Promise<{ items: Employee[]; count: number; totalPages: number; hasNextPage: boolean }> {
		const size = Math.max(1, query?.limit ? Number(query.limit) : 10);
		const page = Math.max(1, query?.page ? Number(query.page) : 1);
		const offset = (page - 1) * size;

		const { count, rows } = await EmployeesModel.findAndCountAll({
			include: [{ model: DepartmentsModel, attributes: ["name"] }],
			order: [["created_at", "DESC"]],
			offset,
			limit: size,
		});

		const totalPages = Math.ceil(count / size);
		const hasNextPage = page < totalPages;

		const items = rows.map((row) => ({
			...row.dataValues,
			department_name: row.dataValues.department.name,
		}));

		return { items, count, totalPages, hasNextPage };
	}

	async delete(id: string): Promise<void> {
		if (!id) {
			throw new ValidationError("ID is required");
		}

		const employee = await EmployeesModel.findOne({ where: { id } });

		if (!employee) {
			throw new ValidationError("Employee not found");
		}

		await employee.destroy();
	}

	async findById(id: string): Promise<Employee> {
		if (!id) {
			throw new ValidationError("ID is required");
		}

		const employee = await EmployeesModel.findOne({ where: { id } });

		if (!employee) {
			throw new ValidationError("Employee not found");
		}

		return employee;
	}

	async update(id: string, data: Omit<Employee, "id" | "created_at" | "updated_at">): Promise<Employee> {
		if (!id) {
			throw new ValidationError("ID is required");
		}

		const employee = await EmployeesModel.findOne({ where: { id } });

		if (!employee) {
			throw new ValidationError("Employee not found");
		}

		if (data?.first_name && data?.first_name !== employee.first_name) {
			employee.set("first_name", data.first_name);
		}

		if (data?.last_name && data?.last_name !== employee.last_name) {
			employee.set("last_name", data.last_name);
		}

		if (data?.email && data?.email !== employee.email) {
			const emailExists = await EmployeesModel.findOne({ where: { email: data.email } });
			if (emailExists) {
				throw new ValidationError("Email is already in use");
			}
			employee.set("email", data.email);
		}

		if (data?.phone && data?.phone !== employee.phone) {
			employee.set("phone", data.phone);
		}

		if (data?.hire_at && data?.hire_at !== employee.hire_at) {
			employee.set("hire_at", data.hire_at);
		}

		if (data?.position && data?.position !== employee.position) {
			employee.set("position", data.position);
		}

		if (data?.salary && data?.salary !== employee.salary) {
			employee.set("salary", data.salary);
		}

		if (data?.department_id && data?.department_id !== employee.department_id) {
			employee.set("department_id", data.department_id);
		}

		if (data?.status && data.status !== employee.status) {
			employee.set("status", data.status);
		}

		employee.set("updated_at", Date.now());

		await employee.save();

		return employee;
	}
}
