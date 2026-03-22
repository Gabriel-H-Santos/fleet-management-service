import express from 'express';
import { router } from '@presentation/routes/router';
import { errorMiddleware } from '@presentation/middlewares/error.middleware';
import { traceIdMiddleware } from '@presentation/middlewares/trace-id.middleware';
import { logMiddleware } from '@presentation/middlewares/log.middleware';

export const app = express();

app.use(express.json());
app.use(traceIdMiddleware);
app.use(logMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.floor(process.uptime()) });
});

app.use('/api', router);

app.use(errorMiddleware);
