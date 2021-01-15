import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICourseRepository, { Filters } from '../repositories/ICourseRepository';
@injectable()
export default class IndexCourseService {
  constructor(
    @inject('CourseRepository')
    private courseRepository: ICourseRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(filters?: Filters): Promise<Course[]> {
    let course = await this.cacheProvider.recovery<Course[]>(
      `course-list-filterBy${JSON.stringify(filters)}`,
    );
    if (!course) {
      course = await this.courseRepository.index(filters);
      await this.cacheProvider.save(
        `course-list-filterBy${JSON.stringify(filters)}`,
        classToClass(course),
      );
    }
    return course;
  }
}
