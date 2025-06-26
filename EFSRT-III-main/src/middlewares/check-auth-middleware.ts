import { NextFunction, Request, Response } from "express";
import { JWTVerifyResult } from "jose";
import { JWT } from "../utils/jwt";

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
	try {
		const rawCookies = req.headers?.cookie;

		if (!rawCookies) {
			return next();
		}

		const tokenCookie = rawCookies
			.split(";")
			.find((cookie) => cookie.trim().startsWith("token="))
			?.split("=")[1];

		if (!tokenCookie || tokenCookie.trim() === "" || tokenCookie.trim() === "undefined") {
			return next();
		}

		const { payload } = (await JWT.validate(tokenCookie)) as JWTVerifyResult;

		if (payload.exp && typeof payload.exp === "number" && payload.exp < Date.now() / 1000) {
			return next();
		}

		return res.redirect("/home");
	} catch (error) {
		return next();
	}
}
