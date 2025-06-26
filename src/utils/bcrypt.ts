import bycript from "bcrypt";
import { environment } from "../config/environment";

export class Bcrypt {
	static async hash(password: string): Promise<string> {
		return await bycript.hash(password, environment.SALT_ROUNDS);
	}

	static async compare(password: string, encryptedPassword: string): Promise<boolean> {
		return await bycript.compare(password, encryptedPassword);
	}
}
