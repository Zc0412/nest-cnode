import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('userAgent')
export class UserAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ua: string;

  @Column({ nullable: true })
  browser_name: string;

  @Column({ nullable: true })
  browser_version: string;

  @Column({ nullable: true })
  engine_name: string;

  @Column({ nullable: true })
  engine_version: string;

  @Column({ nullable: true })
  os_name: string;

  @Column({ nullable: true })
  os_version: string;

  @Column({ nullable: true })
  device_vendor: string;

  @Column({ nullable: true })
  device_model: string;

  @Column({ nullable: true })
  ip: string;
  
  @CreateDateColumn()
  create_at: Date;
}
