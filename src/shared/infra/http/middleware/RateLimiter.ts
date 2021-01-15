import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
  } catch (err) {
    console.log(err);
    throw new AppError('sorry');
  }
}
