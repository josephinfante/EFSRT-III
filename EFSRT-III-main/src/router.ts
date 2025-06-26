import { Request, Response, Router } from "express";
import { AuthRouter } from "./modules/auth/auth.router";
import { authMiddleware } from "./middlewares/auth-middleware";
import { checkAuth } from "./middlewares/check-auth-middleware";
import { DepartmentsRouter } from "./modules/departments/departments.router";
import { EmployeesRouter } from "./modules/employees/employees.router";

export class ServerRouter {
	static get routes(): Router {
		const router = Router();

		// API routes
		router.use("/api/auth", AuthRouter.routes);
		router.use("/api/departments", authMiddleware, DepartmentsRouter.routes);
		router.use("/api/employees", authMiddleware, EmployeesRouter.routes);

		// Web views routes
		router.get("/", checkAuth, (_req: Request, res: Response) => res.render("login", { title: "Login" }));
		router.get("/home", authMiddleware, (_req: Request, res: Response) =>
			res.render("home", { title: "Home", user: res.locals.user }),
		);
		router.get("/employees", authMiddleware, (_req: Request, res: Response) =>
			res.render("employees", {
				title: "Employees",
				employees: [],
			}),
		);
		router.get("/employees/new", authMiddleware, (_req: Request, res: Response) =>
			res.render("add-new-employee", { title: "Add New Employee" }),
		);
		router.get("/employees/:id/edit", authMiddleware, (req, res) => {
			res.render("add-new-employee", {
				title: "Update Employee",
				employeeId: req.params.id,
			});
		});
		router.get("/departments/new", authMiddleware, (_req: Request, res: Response) =>
			res.render("add-new-department", { title: "Add New Department" }),
		);

		router.use((_req: Request, res: Response) => {
			const user = res.locals?.user;

			if (user) {
				return res.redirect("/home");
			}

			return res.redirect("/");
		});

		return router;
	}
}
