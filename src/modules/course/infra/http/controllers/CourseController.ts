import IndexCourseService from '@modules/course/services/indexCourseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Filters } from '@modules/course/repositories/ICourseRepository';
import { classToClass, classToClassFromExist } from 'class-transformer';

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log(
      `Course Controller Start | ${JSON.stringify(request.query, null, 2)}`,
    );
    // console.log(request);

    const { university_name, kind, level, shift } = request.query;

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
    return response.json().status(204);
  }
}
