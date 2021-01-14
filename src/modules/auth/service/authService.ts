import AppError from '@shared/errors/AppError';
import { EMAIL_SCHEMA } from '@shared/utils/schemas';
import Joi from 'joi';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IResponse {
  token: string;
}
interface IRequest {
  email: string;
}
class AuthService {
  public async execute({ email }: IRequest): Promise<IResponse> {
    const { error, value } = await EMAIL_SCHEMA.validate(email);
    if (error) {
      throw new AppError('Sorry you must send an email structure', 401);
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject:
        'I hope you guys like this application that was a pleasure to create :D',
      expiresIn: authConfig.jwt.expiresIn,
    });
    console.log(token);
    return { token };
  }
}

export default AuthService;
