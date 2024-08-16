import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column('text')
  description: string;

  @Column()
  jobType: string; // must be 'Full Stack', 'Front End', or 'Back End'

  @Column()
  salaryFrom: number;

  @Column()
  salaryTo: number;

  @Column()
  postedDate: string;
}
