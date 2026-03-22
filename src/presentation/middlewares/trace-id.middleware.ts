import { Request, Response, NextFunction } from 'express';
import { createContext, runWithContext } from '@infra/logger';

const TRACE_ID_HEADER = 'x-trace-id';
const CORRELATION_ID_HEADER = 'x-correlation-id';
const REQUEST_ID_HEADER = 'x-request-id';

export function traceIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const traceId = req.headers[TRACE_ID_HEADER] as string | undefined;
  const correlationId = req.headers[CORRELATION_ID_HEADER] as string | undefined;
  const requestId = req.headers[REQUEST_ID_HEADER] as string | undefined;

  const context = createContext({ traceId, correlationId, requestId });

  res.setHeader('X-Trace-Id', context.traceId);
  res.setHeader('X-Correlation-Id', context.correlationId);

  runWithContext(context, () => next());
}
