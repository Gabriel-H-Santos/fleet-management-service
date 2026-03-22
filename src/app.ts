import express from 'express';
import { router } from '@presentation/routes/router';
import { errorMiddleware } from '@presentation/middlewares/error.middleware';

export const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorMiddleware);
