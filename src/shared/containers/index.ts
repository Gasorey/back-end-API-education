import CourseRepository from '@modules/course/infra/typeorm/repositories/CourseRepository';
import ICourseRepository from '@modules/course/repositories/ICourseRepository';
import SalesRepository from '@modules/sale/infra/typeorm/repositories/SaleRepository';
import ISaleRepository from '@modules/sale/repositories/ISaleRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICourseRepository>(
  'CourseRepository',
  CourseRepository,
);
container.registerSingleton<ISaleRepository>('SaleRepository', SalesRepository);
