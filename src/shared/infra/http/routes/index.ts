import courseRouter from '@modules/course/infra/http/routes/course.routes';
import salesRouter from '@modules/sale/infra/http/routes/sales.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/course', courseRouter);
routes.use('/sales', salesRouter);

export default routes;
