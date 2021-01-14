import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import Course from '@modules/course/infra/typeorm/entities/Course';
import University from '@modules/university/infra/typeorm/entities/University';
import { Exclude } from 'class-transformer';
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
  @Exclude()
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

  @Exclude()
  @Column('int')
  university_id: number;

  @Exclude()
  @Column('int')
  campus_id: number;

  @Exclude()
  @Column('int')
  course_id: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Campus)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;
}

export default Sale;
