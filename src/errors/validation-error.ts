import { HTTP_STATUS } from "../types/http-status.e";

export class ValidationError extends Error {
  public readonly status_code: number = HTTP_STATUS.BAD_REQUEST;
  public readonly metadata: any;

  constructor(message: string, metadata?: any) {
    super(message);
    this.name = "ValidationError";
    this.metadata = metadata;

    Error.captureStackTrace(this, this.constructor);
  }
}
