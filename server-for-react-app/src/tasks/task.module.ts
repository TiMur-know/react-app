/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entity/Task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';



@Module({
	imports: [TypeOrmModule.forFeature([Task])],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TaskModule { }