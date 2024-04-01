/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from '../entity/TaskList.entity';
import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';

@Module({
	imports: [TypeOrmModule.forFeature([TaskList])],
	controllers: [TaskListsController],
	providers: [TaskListsService],
})
export class TaskListModule { }