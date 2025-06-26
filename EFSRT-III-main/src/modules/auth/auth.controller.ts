import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { environment } from "../../config/environment";
import { tryCatch } from "../../utils/try-catch";

export class AuthController {
	private authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	login = tryCatch(async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const { first_name, last_name, token } = await this.authService.login(email, password);
		res.cookie("token", token, {
			httpOnly: true,
			sameSite: environment.NODE_ENV === "production" ? "none" : "lax",
			secure: environment.NODE_ENV === "production",
			maxAge: 12 * 60 * 60 * 1000,
			path: "/",
			...(environment.NODE_ENV === "production" && { domain: `.${environment.COOKIE_DOMAIN}` }),
		});
		res.status(200).json({ first_name, last_name });
	});
}
