/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/Task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  async findOne(id: number): Promise<Task | undefined> {
    return await this.taskRepository.findOneBy({ id });
  }
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.taskRepository.findOneBy({ id });
    if (!taskToUpdate) {
      throw new Error('Task not found');
    }
    Object.assign(taskToUpdate, updateTaskDto);
    return await this.taskRepository.save(taskToUpdate);
  }
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
  async findFiltered(filterQuery): Promise<Task[]> {
    const tasks = await this.taskRepository.find(filterQuery);
    return tasks;
  }
}
