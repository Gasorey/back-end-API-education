import AuthService from '@modules/auth/service/authService';
import { Request, Response } from 'express';

class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const authService = new AuthService();

    const token = await authService.execute({ email });

    return response.json(token);
  }
}

export default AuthController;
