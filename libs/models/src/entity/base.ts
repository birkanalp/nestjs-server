import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @Column({ default: '' })
  createdBy: string;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;

  @Column({ default: '' })
  updatedBy: string;

  @Column({ default: false })
  deleted: boolean;
}
