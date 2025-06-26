import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation-error";
import { AppError } from "../errors/app-error";
import { AuthError } from "../errors/auth-error";

export async function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
	console.log(err);
	if (err instanceof ValidationError) {
		res.status(err.status_code).json({
			type: err.name,
			status_code: err.status_code,
			message: err.message,
			...(err.metadata && { metadata: err.metadata }),
		});
	} else if (err instanceof AppError) {
		res.status(err.status_code).json({
			type: err.name,
			status_code: err.status_code,
			message: err.message,
		});
	} else if (err instanceof AuthError) {
		res.status(err.status_code).json({
			type: err.name,
			status_code: err.status_code,
			message: err.message,
		});
	} else {
		res.status(500).json({
			type: "InternalServerError",
			status_code: 500,
			message: "Internal server error.",
		});
	}
}
