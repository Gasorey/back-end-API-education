import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const courseRouter = Router();

const courseController = new CourseController();

courseRouter.get('/', courseController.index);

export default courseRouter;
