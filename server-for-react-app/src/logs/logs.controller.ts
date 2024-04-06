/* eslint-disable prettier/prettier */
import { CreateLogDto, GetLogDto } from './logs.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { LogsService } from './logs.service';


@Controller('logs')
export class LogsController {
	constructor(private readonly logsService: LogsService) { }
	@Post()
	async createLog(@Body() createLogDto: CreateLogDto) {
		const log = await this.logsService.create(createLogDto);
		return log;
	}

	@Get(':id')
	async getLog(@Param() getLogDto: GetLogDto) {
		const { id } = getLogDto;
		return await this.logsService.findOne(id);
	}

	@Put(':id')
	async updateLog(@Param('id') id: number, @Body() updateLogDto: Partial<CreateLogDto>) {
		return await this.logsService.update(id, updateLogDto);
	}

	@Delete(':id')
	async deleteLog(@Param('id') id: number) {
		await this.logsService.remove(id);
		return { message: 'Log entry deleted successfully' };
	}
	@Get()
	async getLogs() {
		const logs = await this.logsService.findAll();
    return logs.map(log => ({
      id: log.id.toString(),
      message: log.message,
      timestamp: log.timestamp,
      primaryWords: log.primaryWords,
      secondaryWords: log.secondaryWords,
      task_ids: log.tasks ? log.tasks.map(task => task.id.toString()) : []
    }));
	}

	@Get('/filter')
	async getFilteredLogs(@Query() filterQuery) {
		return await this.logsService.findFiltered(filterQuery);
	}
}
