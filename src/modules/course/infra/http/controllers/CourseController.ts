import IndexCourseService from '@modules/course/services/indexCourseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Filters } from '@modules/course/repositories/ICourseRepository';
import { classToClass, classToClassFromExist } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexCourse = container.resolve(IndexCourseService);

    const getCourse = await indexCourse.execute(request.query);

    if (getCourse) {
      const course = getCourse.map(curCourse => {
        const course = {
          course: curCourse,
        };
        return course;
      });
      return response.json(classToClass(course));
    }
    throw new AppError(
      'Does not find any Course \n Remember to use exact same filter \n it is populated by faker.Js',
      204,
    );
  }
}
