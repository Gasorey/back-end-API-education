import 'reflect-metadata';
import 'dotenv';
import '@shared/infra/typeorm/';
import 'express-async-errors';
import '@shared/containers';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';

import routes from './routes';
import { connection } from '@shared/infra/typeorm/';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middleware/RateLimiter';

const app = express();

connection.connect();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

//AppError middleware
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server up on port 3333');
});
