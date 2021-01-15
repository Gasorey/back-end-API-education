import { connection } from '@shared/infra/typeorm';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakers/FakeCacheProvider';
import CourseRepository from '../infra/typeorm/repositories/CourseRepository';
import IndexCourseService from './indexCourseService';

let courseRepository: CourseRepository;
let cacheProvider: FakeCacheProvider;
let indexCourseService: IndexCourseService;

describe('Index Courses', () => {
  beforeAll(async () => {
    await connection.connect();
  });
  beforeEach(async () => {
    courseRepository = new CourseRepository();
    cacheProvider = new FakeCacheProvider();
    indexCourseService = new IndexCourseService(
      courseRepository,
      cacheProvider,
    );
  });
  it('should be able to list courses', async () => {
    const courses = await indexCourseService.execute();
    expect(courses.length).toEqual(100);
  });
  it('should be able to list corses of one shift', async () => {
    const courses = await indexCourseService.execute();
    const { shift } = courses[0];
    const expectedQuantity = courses.filter(course => course.shift === shift)
      .length;
    const ReceivedQuantity = await (await indexCourseService.execute({ shift }))
      .length;
    expect(expectedQuantity).toEqual(ReceivedQuantity);
  });
  it('should be able to list corses of one kind', async () => {
    const courses = await indexCourseService.execute();
    const { kind } = courses[0];
    const expectedQuantity = courses.filter(course => course.kind === kind)
      .length;
    const ReceivedQuantity = await (await indexCourseService.execute({ kind }))
      .length;
    expect(expectedQuantity).toEqual(ReceivedQuantity);
  });
  it('should be able to list corses of one level', async () => {
    const courses = await indexCourseService.execute();
    const { level } = courses[0];
    const expectedQuantity = courses.filter(course => course.level === level)
      .length;
    const ReceivedQuantity = await (await indexCourseService.execute({ level }))
      .length;
    expect(expectedQuantity).toEqual(ReceivedQuantity);
  });
  it('should be able to list corses of one university', async () => {
    const courses = await indexCourseService.execute();
    const university_name = courses[0].university.name;
    const expectedQuantity = courses.filter(
      course => course.university.name === university_name,
    ).length;
    const ReceivedQuantity = await (
      await indexCourseService.execute({ university_name })
    ).length;
    expect(expectedQuantity).toEqual(ReceivedQuantity);
  });
  it('should be able to list a full filtered course', async () => {
    const courses = await indexCourseService.execute();
    const { kind, shift, level } = courses[0];
    const university_name = courses[0].university.name;
    const filters = {
      university_name,
      kind,
      shift,
      level,
    };
    const filteredCourses = await indexCourseService.execute(filters);
    const courseQuantity = filteredCourses.length;
    const coursesFilter = courses.filter(
      course =>
        course.university.name === university_name &&
        course.kind === kind &&
        course.shift === shift &&
        course.level === level,
    );
    expect(coursesFilter.length).toEqual(courseQuantity);
  });
});
