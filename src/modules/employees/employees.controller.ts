import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch";
import { EmployeesService } from "./employees.service";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

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

	metrics = tryCatch(async (_req: Request, res: Response) => {
		const metrics = await this.employeesService.getMetrics();
		res.status(200).json(metrics);
	});

	exportEmployeesExcel = tryCatch(async (_req: Request, res: Response) => {
		const employees = await this.employeesService.getAllEmployeesWithDepartments();

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Empleados");

		worksheet.columns = [
			{ header: "ID", key: "id", width: 36 },
			{ header: "Nombre", key: "fullName", width: 30 },
			{ header: "Email", key: "email", width: 30 },
			{ header: "Teléfono", key: "phone", width: 20 },
			{ header: "Cargo", key: "position", width: 20 },
			{ header: "Salario", key: "salary", width: 15 },
			{ header: "Fecha Contratación", key: "hire_at", width: 20 },
			{ header: "Departamento", key: "department_name", width: 20 },
			{ header: "Estado", key: "status", width: 12 },
		];

		employees.forEach((emp) => {
			worksheet.addRow({
				id: emp.id,
				fullName: `${emp.first_name} ${emp.last_name}`,
				email: emp.email,
				phone: emp.phone,
				position: emp.position,
				salary: emp.salary,
				hire_at: emp.hire_at ? new Date(emp.hire_at).toISOString().split("T")[0] : "",
				department_name: emp.department_name,
				status: emp.status,
			});
		});

		worksheet.getRow(1).font = { bold: true };

		res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", 'attachment; filename="empleados.xlsx"');

		await workbook.xlsx.write(res);
		res.end();
	});

	exportEmployeesPdf = tryCatch(async (_req: Request, res: Response) => {
		const employees = await this.employeesService.getAllEmployeesWithDepartments();

		const doc = new PDFDocument({ margin: 30, size: "A4" });

		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", 'attachment; filename="empleados.pdf"');

		doc.pipe(res);

		doc.fontSize(20).text("Reporte de Empleados", { align: "center" }).moveDown();

		const tableTop = 80;
		const itemHeight = 20;
		const headers = ["Nombre", "Email", "Cargo", "Salario", "Departamento", "Fecha Contratación"];

		let y = tableTop;
		doc.fontSize(12).font("Helvetica-Bold");
		headers.forEach((header, i) => {
			doc.text(header, 30 + i * 90, y);
		});

		doc.font("Helvetica");
		y += itemHeight;

		employees.forEach((emp) => {
			const hireDate = emp.hire_at ? new Date(emp.hire_at).toISOString().split("T")[0] : "";
			doc.text(`${emp.first_name} ${emp.last_name}`, 30, y);
			doc.text(emp.email, 120, y);
			doc.text(emp.position, 210, y);
			doc.text(emp.salary.toString(), 300, y);
			doc.text(emp.department_name, 390, y);
			doc.text(hireDate, 480, y);
			y += itemHeight;

			if (y > 700) {
				doc.addPage();
				y = tableTop;
			}
		});

		doc.end();
	});
}
