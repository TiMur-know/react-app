/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task.entity';

@Entity()
export class Log {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	message: string;

	@Column({ type: 'timestamp' })
	timestamp: Date;

	@Column("text", { array: true,nullable:true })
	primaryWords: string[];

	@Column("text", { array: true })
	secondaryWords: string[];

	@ManyToMany(() => Task, (task) => task.logs)
	@JoinTable()
	tasks?:Task[]
}