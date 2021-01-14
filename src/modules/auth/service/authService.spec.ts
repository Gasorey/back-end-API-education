import AppError from '@shared/errors/AppError';
import AuthService from './authService';

let authService: AuthService;
describe('Authenticate', () => {
  beforeEach(() => {
    authService = new AuthService();
  });
  it('Should be  not able to authenticate a wrong email', async () => {
    await expect(
      authService.execute({
        email: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able to authenticate', async () => {
    const email = 'gasorey@gmail.com';
    const response = await authService.execute({ email });
    expect(response).toHaveProperty('token');
  });
});
