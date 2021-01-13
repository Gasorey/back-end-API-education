import courseRouter from '@modules/course/infra/http/routes/course.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/course', courseRouter);

export default routes;
