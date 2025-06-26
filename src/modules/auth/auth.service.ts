import { AppError } from "../../errors/app-error";
import { ValidationError } from "../../errors/validation-error";
import { UsersModel } from "../../models/users-model";
import { HTTP_STATUS } from "../../types/http-status.e";
import { JWT } from "../../utils/jwt";

export class AuthService {
	async login(email: string, password: string): Promise<{ first_name: string; last_name: string; token: string }> {
		if (!email || !password) {
			throw new ValidationError("Email and password are required");
		}

		const user = await UsersModel.findOne({ where: { email, status: "active" } });
		if (!user) {
			throw new ValidationError("Invalid email or password");
		}

		const token = await JWT.sign({
			email: email,
		});

		if (!token) {
			throw new AppError({ status_code: HTTP_STATUS.INTERNAL_ERROR, message: "Unable to generate token" });
		}

		return { first_name: user.first_name, last_name: user.last_name, token };
	}
}
