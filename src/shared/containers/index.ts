import CourseRepository from '@modules/course/infra/typeorm/repositories/CourseRepository';
import ICourseRepository from '@modules/course/repositories/ICourseRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICourseRepository>(
  'CourseRepository',
  CourseRepository,
);
