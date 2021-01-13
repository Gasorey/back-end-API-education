import ICourseRepository, {
  Filters,
} from '@modules/course/repositories/ICourseRepository';
import { getRepository, Repository, getManager } from 'typeorm';
import Course from '../entities/Course';

class CourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async index(filters?: Filters): Promise<Course[]> {
    console.log(
      `Course Repository Index START | ${JSON.stringify(filters, null, 2)}`,
    );
    if (filters?.university_name) {
      const course = await this.ormRepository
        .createQueryBuilder('course')
        .innerJoinAndSelect('course.university', 'university')
        .innerJoinAndSelect('course.campus', 'campus')
        .where(
          `
            ${filters.university_name ? `university.name =:name` : ``}
            ${filters.kind ? `AND kind =:kind` : ``}
            ${filters.level ? `AND level =:level` : ``}
            ${filters.shift ? `AND shift =:shift` : ``}
          `,
          {
            name: filters.university_name,
            kind: filters.kind,
            level: filters.level,
            shift: filters.shift,
          },
        )
        .getMany();
      return course;
    }
    const course = await this.ormRepository.find({
      relations: ['university', 'campus'],
      where: filters,
    });
    return course;
  }
}

export default CourseRepository;
