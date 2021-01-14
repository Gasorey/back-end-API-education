import { Router } from 'express';

import { celebrate, Segments } from 'celebrate';
import AuthController from '../controllers/AuthController';
import { EMAIL_SCHEMA } from '@shared/utils/schemas';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: EMAIL_SCHEMA,
    },
  }),
  authController.create,
);

export default authRouter;
