import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import Course from '@modules/course/infra/typeorm/entities/Course';
import University from '@modules/university/infra/typeorm/entities/University';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column('float')
  full_price: number;

  @Column('float')
  price_with_discount: number;

  @Column('float')
  discount_percentage: number;

  @Column('varchar')
  start_date: string;

  @Column('varchar')
  enrollment_semester: string;

  @Column('boolean')
  enabled: Boolean;

  @Column('int')
  university_id: number;

  @Column('int')
  campus_id: number;

  @Column('int')
  course_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Campus)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}

export default Sale;
