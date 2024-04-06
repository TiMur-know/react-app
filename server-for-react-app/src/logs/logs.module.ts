/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../entity/Log.entity';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
	imports: [TypeOrmModule.forFeature([Log])],
	controllers: [LogsController],
	providers: [LogsService],
})
export class LogsModule { }