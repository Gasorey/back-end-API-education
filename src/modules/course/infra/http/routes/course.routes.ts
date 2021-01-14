import authenticator from '@shared/infra/http/middleware/authenticator';
import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const courseRouter = Router();

const courseController = new CourseController();

courseRouter.use(authenticator);

courseRouter.get('/', courseController.index);

export default courseRouter;
