import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  login_name: string;

  @Column()
  pass: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column({
    nullable: true,
  })
  githubId: string;

  @Column({ nullable: true })
  githubUsername: string;

  @Column({ nullable: true })
  githubAccessToken: string;

  @Column({ default: false })
  is_block: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  topic_count: number;

  @Column({ default: 0 })
  reply_count: number;

  @Column({ default: 0 })
  follower_count: number;

  @Column({ default: 0 })
  following_count: number;

  @Column({ default: 0 })
  collect_tag_count: number;

  @Column({ default: 0 })
  collect_topic_count: number;

  @Column({ default: false })
  active: boolean;

  @Column({ default: false })
  receive_reply_mail: boolean;

  @Column({ default: false })
  receive_at_mail: boolean;

  @Column({ nullable: true })
  accessToken: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
