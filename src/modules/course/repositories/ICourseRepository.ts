import Course from '../infra/typeorm/entities/Course';

export interface Filters {
  university_name?: string;
  kind?: string;
  level?: string;
  shift?: string;
}

export default interface ICourseRepository {
  index(filters?: Filters): Promise<Course[]>;
}
