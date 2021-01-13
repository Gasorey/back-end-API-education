import University from '@modules/university/infra/typeorm/entities/University';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('campus')
class Campus {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: BigInt;

  @Column('varchar')
  name: string;

  @Column('varchar')
  city: string;

  @Exclude()
  @Column('int')
  university_id: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}

export default Campus;
