import { NextFunction, Request, Response } from "express";
import { JWTVerifyResult } from "jose";
import { JWT } from "../utils/jwt";
import { AuthError } from "../errors/auth-error";
import { ERROR_MESSAGES } from "../types/error-messages.e";
import { UsersModel } from "../models/users-model";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const raw_cookies = req.headers?.cookie;

		if (!raw_cookies) throw new AuthError({ message: ERROR_MESSAGES.NO_TOKEN_PROVIDED });

		const token_cookie = raw_cookies
			.split(";")
			.find((cookie) => cookie.trim().startsWith("token="))
			?.split("=")[1];

		if (!token_cookie || token_cookie.trim() === "" || token_cookie.trim() === "undefined")
			throw new AuthError({ message: ERROR_MESSAGES.NO_TOKEN_PROVIDED });

		const { payload } = (await JWT.validate(token_cookie)) as JWTVerifyResult;

		if (payload.exp && typeof payload.exp === "number" && payload.exp < Date.now() / 1000)
			throw new AuthError({ message: ERROR_MESSAGES.EXPIRED_TOKEN });

		const data = await UsersModel.findOne({ where: { email: payload.email as string } });

		if (!data) throw new AuthError({ message: ERROR_MESSAGES.INVALID_TOKEN });

		res.locals.user = data;

		next();
	} catch (error) {
		return next(error);
	}
}
