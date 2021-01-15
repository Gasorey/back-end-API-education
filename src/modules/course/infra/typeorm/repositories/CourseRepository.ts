import ICourseRepository, {
  Filters,
} from '@modules/course/repositories/ICourseRepository';
import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';
import Course from '../entities/Course';
class CourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async index(filters?: Filters): Promise<Course[]> {
    if (filters?.university_name) {
      const getCourse = await this.ormRepository
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
        .getRawMany();
      return getCourse;
    }
    const course = await this.ormRepository.find({
      relations: ['university', 'campus'],
      where: filters,
    });
    return course;
  }
}

export default CourseRepository;
