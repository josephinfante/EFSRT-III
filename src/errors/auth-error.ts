import { HTTP_STATUS } from "../types/http-status.e";

export class AuthError extends Error {
  public readonly status_code: number;

  constructor({ status_code, message }: { status_code?: number; message: string }) {
    super(message);
    this.name = "AuthError";
    this.status_code = status_code || HTTP_STATUS.UNAUTHORIZED;

    Error.captureStackTrace(this, this.constructor);
  }
}
