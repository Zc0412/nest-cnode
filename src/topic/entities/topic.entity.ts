import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  tab: string;

  @Column()
  content: string;

  @Column()
  author_id: string;

  @Column({ default: false })
  top: boolean;

  @Column({ default: false })
  good: boolean;

  @Column({ default: 0 })
  visit_count: number;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
