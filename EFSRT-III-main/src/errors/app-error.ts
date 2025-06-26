export class AppError extends Error {
	public readonly status_code: number;

	constructor({ status_code, message }: { status_code: number; message: string }) {
		super(message);
		this.name = "AppError";
		this.status_code = status_code;

		Error.captureStackTrace(this, this.constructor);
	}
}
