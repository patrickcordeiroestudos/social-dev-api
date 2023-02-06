import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Institutions } from './institutions.entity';

@Entity('homeless')
class Homeless {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({length: 60})
  name: string;

  @Column({length: 3})
  age: string;

  @CreateDateColumn({type: 'date'})
  created_at: Date;

  @UpdateDateColumn({type: 'date'})
  updated_at: Date;

  @Column({type: 'text', nullable: true})
  picture: string | null;

  @ManyToOne(() => Institutions, (instituition) => instituition.homeless, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  institution: Institutions;
};

export { Homeless };