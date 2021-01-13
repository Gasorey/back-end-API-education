import Course from '@modules/course/infra/typeorm/entities/Course';
import { isEqual } from 'date-fns';
import ICourseRepository, { Filters } from '../ICourseRepository';

class FakeCourseRepository implements ICourseRepository {
  private course: Course[] = [];

  public async index(filters?: Filters): Promise<Course[]> {
    if (!filters) {
      const course = this.course;
      return course;
    }
    const course = this.course.filter(
      course =>
        course.kind === filters.kind ||
        course.level === filters.level ||
        course.shift === filters.shift ||
        course.university.name === filters.university_name,
    );
    return course;
  }
}

export default FakeCourseRepository;
