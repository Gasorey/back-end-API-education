import ICourseRepository, {
  Filters,
} from '@modules/course/repositories/ICourseRepository';
import University from '@modules/university/infra/typeorm/entities/University';
import { getRepository, Repository } from 'typeorm';
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
    const course = await this.ormRepository.find({
      relations: ['university', 'campus'],
      where: filters,
    });
    return course;
  }
}

export default CourseRepository;
