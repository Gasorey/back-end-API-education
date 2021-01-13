import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import University from '@modules/university/infra/typeorm/entities/University';
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

  @Column('int')
  university_id: number;

  @Column('int')
  campus_id: number;

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
