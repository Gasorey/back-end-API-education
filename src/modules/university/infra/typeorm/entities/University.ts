import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('university')
class University {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: BigInt;

  @Column('varchar')
  name: string;

  @Column('float')
  score: number;

  @Column('varchar')
  logo_url: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;
}

export default University;
