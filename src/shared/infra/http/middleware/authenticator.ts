import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { NextFunction, Request, Response } from 'express';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticator(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing JWT token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    return next();
  } catch (err) {
    console.log(err);
    throw new AppError(
      'Was not possible to validate your token it expires in 2 days',
      401,
    );
  }
}
