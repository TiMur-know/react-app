/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto, GetTaskListDto, UpdateTaskListDto } from './task-lists.dto';


@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) { }

  @Post()
  async createTaskList(@Body() createTaskListDto: CreateTaskListDto) {
    const taskList = await this.taskListsService.create(createTaskListDto);
    return taskList;
  }

  @Get(':id')
  async getTaskList(@Param() getTaskListDto: GetTaskListDto) {
    const { id } = getTaskListDto;
    return await this.taskListsService.findOne(id);
  }

  @Put(':id')
  async updateTaskList(@Param('id') id: number, @Body() updateTaskListDto: UpdateTaskListDto) {
    return await this.taskListsService.update(id, updateTaskListDto);
  }

  @Delete(':id')
  async deleteTaskList(@Param('id') id: number) {
    await this.taskListsService.remove(id);
    return { message: 'Task list deleted successfully' };
  }

  @Get()
  async getTaskLists() {
    const taskLists = await this.taskListsService.findAll();
    return taskLists.map(taskList => ({
      id: taskList.id.toString(),
      name: taskList.name,
      tasks: taskList.tasks ? taskList.tasks.map(task => ({
        id: task.id.toString(),
        name: task.name,
        description: task.description,
        date: task.dueDate,
        priority: task.priority,
        logs: task.logs ? task.logs.map(log => log.id.toString()) : []
      })) : []
    }));
  }

  @Get('/filter')
  async getFilteredTaskLists(@Query() filterQuery) {

    return await this.taskListsService.findFiltered(filterQuery);
  }
}
