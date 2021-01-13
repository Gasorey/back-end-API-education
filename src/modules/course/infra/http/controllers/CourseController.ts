import IndexCourseService from '@modules/course/services/indexCourseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Filters } from '@modules/course/repositories/ICourseRepository';
import { classToClass } from 'class-transformer';

export default class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log(
      `Course Controller Start | ${JSON.stringify(request.query, null, 2)}`,
    );
    // console.log(request);

    const { university_name, kind, level, shift } = request.query;

    const filters = {
      university_name,
      kind,
      level,
      shift,
    };

    const indexCourse = container.resolve(IndexCourseService);

    const course = await indexCourse.execute(request.query);
    return response.json({ course: classToClass(course) });
  }
}
