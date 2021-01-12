import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Course1610421159104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'kind',
            type: 'varchar',
          },
          {
            name: 'level',
            type: 'varchar',
          },
          {
            name: 'shift',
            type: 'varchar',
          },
          {
            name: 'university_id',
            type: 'int',
          },
          {
            name: 'campus_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'course',
      new TableForeignKey({
        name: 'Fk_CourseKeyToUniversityData',
        columnNames: ['university_id'],
        referencedTableName: 'university',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'course',
      new TableForeignKey({
        name: 'Fk_CourseKeyToCampusData',
        columnNames: ['campus_id'],
        referencedTableName: 'campus',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course', 'Fk_CourseKeyToCampusData');
    await queryRunner.dropForeignKey('course', 'Fk_CourseKeyToUniversityData');
    await queryRunner.dropTable('course');
  }
}
