import 'reflect-metadata';
import '@di/index';
import { app } from './app';
import { logger } from '@infra/logger';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info({ message: `Server running on port ${PORT}` });
});

const shutdown = () => {
  server.close(() => {
    logger.info({ message: 'Server closed' });
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
