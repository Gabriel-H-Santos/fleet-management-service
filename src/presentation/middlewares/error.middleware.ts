import { Request, Response, NextFunction } from 'express';
import { BaseHttpException } from '@infra/protocols/http/exceptions/base-http.exception';
import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof BaseHttpException) {
    res.status(err.statusCode).json(err.toJSON());
    return;
  }

  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    name: 'InternalServerError',
    message: 'An unexpected error occurred',
    errorCode: 'INTERNAL_SERVER_ERROR',
    statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
    timestamp: new Date().toISOString(),
  });
}
