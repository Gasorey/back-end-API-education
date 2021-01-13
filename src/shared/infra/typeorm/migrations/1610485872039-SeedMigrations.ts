import { MigrationInterface, QueryRunner, DeleteQueryBuilder } from 'typeorm';
import {
  fakeCampus,
  fakeUniversities,
  fakeSales,
  fakeCourse,
} from '../seeds/seedGenerator';
export class SeedMigrations1610485872039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('university')
      .values(fakeUniversities)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('campus')
      .values(fakeCampus)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('course')
      .values(fakeCourse)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('sales')
      .values(fakeSales)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('sales');
    await queryRunner.clearTable('course');
    await queryRunner.clearTable('campus');
    await queryRunner.clearTable('university');
  }
}
