import pino from 'pino';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export interface LogContext {
  traceId: string;
  correlationId: string;
  requestId?: string;
}

export const asyncContextManager = new AsyncLocalStorage<LogContext>();

export const getContext = (): LogContext | null => {
  return asyncContextManager.getStore() ?? null;
};

export const createContext = (initial?: Partial<LogContext>): LogContext => ({
  traceId: initial?.traceId ?? randomUUID(),
  correlationId: initial?.correlationId ?? randomUUID(),
  requestId: initial?.requestId,
});

export const runWithContext = <T>(context: LogContext, fn: () => T): T => {
  return asyncContextManager.run(context, fn);
};

const level =
  process.env.NODE_ENV === 'test' ? 'silent' : (process.env.LOG_LEVEL ?? 'info');

const transport =
  process.env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' },
      }
    : undefined;

const pinoInstance = pino({ level, ...(transport && { transport }) });

const enrichWithContext = (data: Record<string, unknown>): Record<string, unknown> => {
  const context = getContext();
  if (!context) return data;
  return {
    ...data,
    traceId: (data['traceId'] as string | undefined) ?? context.traceId,
    correlationId:
      (data['correlationId'] as string | undefined) ?? context.correlationId,
    ...(context.requestId && {
      requestId: (data['requestId'] as string | undefined) ?? context.requestId,
    }),
  };
};

type LogData = Record<string, unknown> & { message: string };

export const logger = {
  info(data: LogData): void {
    const enriched = enrichWithContext(data);
    const { message, ...rest } = enriched as LogData;
    pinoInstance.info(rest, message);
  },
  warn(data: LogData): void {
    const enriched = enrichWithContext(data);
    const { message, ...rest } = enriched as LogData;
    pinoInstance.warn(rest, message);
  },
  error(data: LogData): void {
    const enriched = enrichWithContext(data);
    const { message, ...rest } = enriched as LogData;
    pinoInstance.error(rest, message);
  },
  debug(data: LogData): void {
    const enriched = enrichWithContext(data);
    const { message, ...rest } = enriched as LogData;
    pinoInstance.debug(rest, message);
  },
};
