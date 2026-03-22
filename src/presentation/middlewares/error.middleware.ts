import { Request, Response, NextFunction } from 'express';
import { BaseHttpException } from '@infra/protocols/http/exceptions/base-http.exception';
import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';
import { logger } from '@infra/logger';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof BaseHttpException) {
    if (err.statusCode >= 500) {
      logger.error({
        message: err.message,
        'error.kind': err.name,
        'error.code': err.errorCode,
        'error.stack': err.stack,
      });
    }
    res.status(err.statusCode).json(err.toJSON());
    return;
  }

  logger.error({
    message: err.message || 'An unexpected error occurred',
    'error.kind': err.constructor.name,
    'error.stack': err.stack,
  });

  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    name: 'InternalServerError',
    message: 'An unexpected error occurred',
    errorCode: 'INTERNAL_SERVER_ERROR',
    statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
    timestamp: new Date().toISOString(),
  });
}
