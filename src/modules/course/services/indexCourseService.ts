import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICourseRepository, { Filters } from '../repositories/ICourseRepository';

interface IResponse {
  course: {
    name: string;
    kind: string;
    level: string;
    shift: string;
    university: {
      name: string;
      score: number;
      logo_url: string;
    };
    campus: {
      name: string;
      city: string;
    };
  };
}

@injectable()
export default class IndexCourseService {
  constructor(
    @inject('CourseRepository')
    private courseRepository: ICourseRepository,
  ) {}

  public async execute(filters: Filters): Promise<Course[]> {
    console.log(
      `Course Index Service Start | ${JSON.stringify(filters, null, 2)}`,
    );
    console.log(filters, 'filters');

    if (filters) {
      // const newFilter = {
      //   university: {
      //     university_name: filters.university_name,
      //   },
      //   kind: filters.kind,
      //   shift: filters.shift,
      //   level: filters.level,
      // };
      // console.log(newFilter);
      const course = await this.courseRepository.index(filters);
      return course;
    }
    const course = await this.courseRepository.index();
    return course;
  }
}
