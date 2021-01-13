import Course from '../infra/typeorm/entities/Course';

export interface Filters {
  university_name?: string | undefined;
  kind?: string | undefined;
  level?: string | undefined;
  shift?: string | undefined;
}

export default interface ICourseRepository {
  index(filters: Filters): Promise<Course[]>;
}
