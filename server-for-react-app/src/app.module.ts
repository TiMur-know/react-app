/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entity/Log.entity';
import { Task } from 'src/entity/Task.entity';
import { TaskList } from 'src/entity/TaskList.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './logs/logs.module';
import { TaskListModule } from './task-lists/task-lists.module';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Task, TaskList, Log],
      synchronize: true,
    }),
    TaskModule,
    LogsModule,
    TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
