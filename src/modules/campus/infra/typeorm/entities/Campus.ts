import University from '@modules/university/infra/typeorm/entities/University';
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
  @PrimaryGeneratedColumn('increment')
  id: BigInt;

  @Column('varchar')
  name: string;

  @Column('varchar')
  city: string;

  @Column('int')
  university_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}

export default Campus;
