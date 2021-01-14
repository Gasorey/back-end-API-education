import authenticator from '@shared/infra/http/middleware/authenticator';
import { Router } from 'express';
import SalesController from '../controllers/SalesController';
const salesController = new SalesController();

const salesRouter = Router();

salesRouter.use(authenticator);

salesRouter.get('/', salesController.index);

export default salesRouter;
