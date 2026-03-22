import { Request, Response, NextFunction } from 'express';
import { logger } from '@infra/logger';

const SENSITIVE_FIELDS = ['licenseNumber', 'license_number'];

const SKIP_PATHS = ['/health'];

const redact = (obj: unknown): Record<string, unknown> => {
  if (!obj || typeof obj !== 'object') return {};
  const result: Record<string, unknown> = { ...(obj as Record<string, unknown>) };
  for (const key in result) {
    if (SENSITIVE_FIELDS.some((f) => key.toLowerCase().includes(f.toLowerCase()))) {
      result[key] = '*****';
    } else if (typeof result[key] === 'object') {
      result[key] = redact(result[key]);
    }
  }
  return result;
};

const getResponseTime = (start: [number, number]): string => {
  const [s, ns] = process.hrtime(start);
  return `${(s * 1e3 + ns / 1e6).toFixed(2)}ms`;
};

export function logMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (SKIP_PATHS.some((p) => req.path.startsWith(p))) {
    next();
    return;
  }

  const start = process.hrtime();
  const requestBody =
    req.method !== 'GET' && req.body && Object.keys(req.body).length > 0
      ? redact(req.body)
      : undefined;

  res.on('finish', () => {
    const responseTime = getResponseTime(start);
    const durationMs = parseFloat(responseTime);
    const status = res.statusCode;

    const baseLog = {
      event: 'http.request.completed',
      'http.method': req.method,
      'http.path': req.path,
      'http.status_code': status,
      duration_ms: durationMs,
      ...(requestBody && { requestBody }),
    };

    if (status < 400) {
      logger.info({
        message: `${req.method} ${req.url} - ${status} (${responseTime})`,
        ...baseLog,
        status: 'success',
      });
    } else if (status < 500) {
      logger.warn({
        message: `${req.method} ${req.url} - ${status} (${responseTime})`,
        ...baseLog,
        status: 'failure',
      });
    } else {
      logger.error({
        message: `${req.method} ${req.url} - ${status} (${responseTime})`,
        ...baseLog,
        status: 'failure',
      });
    }
  });

  next();
}
