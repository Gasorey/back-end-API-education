import ISaleRepository, {
  Filters,
} from '@modules/sale/repositories/ISaleRepository';
import { getRepository, Repository } from 'typeorm';
import Sale from '../entities/Sale';

class SalesRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async index(filters: Filters, order?: any): Promise<Sale[]> {
    if (filters && Object.keys(filters).length > 1) {
      console.log(filters, 'inside');
      const getSale = await this.ormRepository
        .createQueryBuilder('sale')
        .innerJoinAndSelect('sale.course', 'course')
        .innerJoinAndSelect('sale.university', 'university')
        .innerJoinAndSelect('sale.campus', 'campus')
        .orderBy('price_with_discount', `ASC`)
        .where(
          `${
            Object.keys(filters)[0]
              ? `${Object.keys(filters)[0].split('_')[0]}.${
                  Object.keys(filters)[0].split('_')[1]
                } =:${Object.keys(filters)[0]}`
              : ``
          }
            ${
              filters?.university_name
                ? `AND university.name =:university_name`
                : ''
            }
            ${filters?.campus_city ? `AND campus.city =:campus_city` : ''}
            ${filters?.course_shift ? `AND course.shift =:course_shift` : ''}
            ${filters?.course_kind ? `AND course.kind =:course_kind` : ''}
            ${filters?.course_name ? `AND course.kind =:course_name` : ''}
            ${filters?.course_level ? `AND course.level =:course_level` : ''}
          `,
          {
            university_name: filters?.university_name,
            course_name: filters?.course_name,
            course_kind: filters?.course_kind,
            course_shift: filters?.course_shift,
            course_level: filters?.course_level,
            campus_city: filters?.campus_city,
          },
        )
        .getMany();
      return getSale;
    } else if (filters && Object.keys(filters).length === 1) {
      const getSale = await this.ormRepository
        .createQueryBuilder('sale')
        .innerJoinAndSelect('sale.course', 'course')
        .innerJoinAndSelect('sale.university', 'university')
        .innerJoinAndSelect('sale.campus', 'campus')
        .where(
          `${
            filters?.university_name ? `university.name =:university_name` : ''
          }
          ${filters?.campus_city ? ` campus.city =:campus_city` : ''}
          ${filters?.course_shift ? ` course.shift =:course_shift` : ''}
          ${filters?.course_kind ? ` course.kind =:course_kind` : ''}
          ${filters?.course_name ? ` course.kind =:course_name` : ''}
          ${filters?.course_level ? ` course.level =:course_level` : ''}
        `,
          {
            university_name: filters?.university_name,
            course_name: filters?.course_name,
            course_kind: filters?.course_kind,
            course_shift: filters?.course_shift,
            course_level: filters?.course_level,
            campus_city: filters?.campus_city,
          },
        )
        .getMany();
      return getSale;
    }
    const sale = await this.ormRepository.find({
      relations: ['course', 'university', 'campus'],
    });
    return sale;
  }
}

export default SalesRepository;
