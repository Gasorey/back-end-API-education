import { connection } from '@shared/infra/typeorm';
import CourseRepository from '../infra/typeorm/repositories/CourseRepository';
import FakeCourseRepository from '../repositories/fakes/FakeCourseRepository';

let fakeCourseRepository: FakeCourseRepository;
let courseRepository: CourseRepository;

describe('Index Courses', () => {
  beforeAll(async () => {});
  beforeEach(async () => {
    await connection.connect();
    // fakeCourseRepository = new FakeCourseRepository();
    courseRepository = new CourseRepository();
  });
  it('should be able to list courses', async () => {
    const courses = await courseRepository.index();
    console.log(courses);
    expect(courses.length).toEqual(100);
  });
});
