import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';

export interface BaseHttpExceptionMetadata {
  [key: string]: unknown;
}

export abstract class BaseHttpException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly metadata?: BaseHttpExceptionMetadata;
  public readonly timestamp: Date;

  constructor(
    message: string,
    errorCode: string,
    statusCode: number = HTTPStatus.INTERNAL_SERVER_ERROR,
    metadata?: BaseHttpExceptionMetadata,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.metadata = metadata;
    this.timestamp = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
      metadata: this.metadata,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
