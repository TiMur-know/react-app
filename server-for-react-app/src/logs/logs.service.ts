/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/entity/Task.entity";
import { Repository } from "typeorm";
import { Log } from "../entity/Log.entity";
import { CreateLogDto } from "./logs.dto";

@Injectable()
export class LogsService {
	constructor(
		@InjectRepository(Log)
		private readonly logRepository: Repository<Log>,
		
	) { }
	async create(createLogDto: CreateLogDto): Promise<Log> {
		const newLog = this.logRepository.create(createLogDto);
		if (createLogDto.taskIds) {
			const tasks = await this.logRepository.manager.findByIds(Task, createLogDto.taskIds);
			newLog.tasks = tasks;
		}
  	return await this.logRepository.save(newLog);
	}
	async findAll(): Promise<Log[]> {
		return await this.logRepository.find({ relations: ['tasks'] })
	}
	async findOne(id: number): Promise<Log | undefined> {
		return await this.logRepository.findOne({ where: { id }, relations: ['tasks'] })
	}
	async update(id: number, updateLogDto: Partial<CreateLogDto>): Promise<Log> {
		const logToUpdate = await this.logRepository.findOneBy({ id });
		if (!logToUpdate) {
			throw new Error('Log entry not found');
		}
		Object.assign(logToUpdate, updateLogDto);
		return await this.logRepository.save(logToUpdate);
	}
	async remove(id: number): Promise<void> {
		await this.logRepository.delete(id);
	}
	async findFiltered(filterQuery): Promise<Log[]> {
		const logs = await this.logRepository.find(filterQuery);
		return logs;
	}
}