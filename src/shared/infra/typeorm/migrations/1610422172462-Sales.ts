import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Sales1610422172462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_price',
            type: 'float',
          },
          {
            name: 'price_with_discount',
            type: 'float',
          },
          {
            name: 'discount_percentage',
            type: 'float',
          },
          {
            name: 'start_date',
            type: 'varchar',
          },
          {
            name: 'enrollment_semester',
            type: 'varchar',
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: 'true',
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
            name: 'course_id',
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
      'sales',
      new TableForeignKey({
        name: 'Fk_SalesKeyToUniversityData',
        columnNames: ['university_id'],
        referencedTableName: 'university',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        name: 'Fk_SalesKeyToCampusData',
        columnNames: ['campus_id'],
        referencedTableName: 'campus',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        name: 'Fk_SalesKeyToCourseData',
        columnNames: ['course_id'],
        referencedTableName: 'course',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sales', 'Fk_SalesKeyToCourseData');
    await queryRunner.dropForeignKey('sales', 'Fk_SalesKeyToCampusData');
    await queryRunner.dropForeignKey('sales', 'Fk_SalesKeyToUniversityData');
    await queryRunner.dropTable('sales');
  }
}
