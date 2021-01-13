import { connection } from '@shared/infra/typeorm';
import CourseRepository from '../infra/typeorm/repositories/CourseRepository';

let courseRepository: CourseRepository;

describe('Index Courses', () => {
  beforeAll(async () => {
    await connection.connect();
  });
  beforeEach(async () => {
    courseRepository = new CourseRepository();
  });
  it('should be able to list courses', async () => {
    const courses = await courseRepository.index();
    expect(courses.length).toEqual(100);
  });
  it('should be able to list corses of one kind', async () => {
    const filters = {
      shift: 'Manhã',
    };
    const courses = await courseRepository.index(filters);
    const courseQuantity = courses.length;
    const coursesFilter = courses.filter(course => course.shift === 'Manhã');
    expect(coursesFilter.length).toEqual(courseQuantity);
  });
});
