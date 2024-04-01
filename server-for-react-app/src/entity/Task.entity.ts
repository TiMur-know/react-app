/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from './Log.entity';
import { TaskList } from './TaskList.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column()
  priority: string;

  @ManyToOne(() => TaskList, (list) => list.tasks)
  list: TaskList;
  @ManyToMany(() => Log, (log) => log.tasks)
  logs?: Log[];
}