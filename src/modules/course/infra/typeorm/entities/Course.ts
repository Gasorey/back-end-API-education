import Campus from '@modules/campus/infra/typeorm/entities/Campus';
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

@Entity('course')
class Course {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: BigInt;

  @Column('varchar')
  name: string;

  @Column('varchar')
  kind: string;

  @Column('varchar')
  level: string;

  @Column('varchar')
  shift: string;

  @Exclude()
  @Column('int')
  university_id: number;

  @Exclude()
  @Column('int')
  campus_id: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Campus)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;
}

export default Course;
