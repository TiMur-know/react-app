/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from '../entity/TaskList.entity';
import { CreateTaskListDto, UpdateTaskListDto } from './task-lists.dto';


@Injectable()
export class TaskListsService {
	constructor(
		@InjectRepository(TaskList)
		private readonly taskListRepository: Repository<TaskList>,
	) { }

	async create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
		const newTaskList = this.taskListRepository.create(createTaskListDto);
		return await this.taskListRepository.save(newTaskList);
	}

	async findAll(): Promise<TaskList[]> {

		return await this.taskListRepository.find({ relations: ['tasks'] }); // 
	}

	async findOne(id: number): Promise<TaskList | undefined> {

		return await this.taskListRepository.findOne({ where: { id }, relations: ['tasks'] });
	}

	async update(id: number, updateTaskListDto: UpdateTaskListDto): Promise<TaskList> {
		const taskListToUpdate = await this.taskListRepository.findOneBy({ id });
		if (!taskListToUpdate) {
			throw new Error('Task list not found');
		}
		Object.assign(taskListToUpdate, updateTaskListDto);
		return await this.taskListRepository.save(taskListToUpdate);
	}

	async remove(id: number): Promise<void> {
		await this.taskListRepository.delete(id);
	}

	async findFiltered(filterQuery): Promise<TaskList[]> {

		const taskLists = await this.taskListRepository.find(filterQuery);
		return taskLists;
	}
}
