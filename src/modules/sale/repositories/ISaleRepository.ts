import Sale from '../infra/typeorm/entities/Sale';

export interface Filters {
  university_name?: string;
  course_name?: string;
  course_kind?: string;
  course_level?: string;
  course_shift?: string;
  campus_city?: string;
}

export default interface ISaleRepository {
  index(filter?: any, order?: string): Promise<Sale[]>;
}
