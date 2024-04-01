/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from "./task.dto";

@Controller('tasks')
export class TasksController{
  constructor(
    private readonly tasksService: TasksService
  ){}
  @Post()
  async createTask(@Body() createTaskDto:CreateTaskDto){
    const task =await  this.tasksService.create(createTaskDto)
    return task
  }
  @Get(':id')
  async getTask(@Param() getTaskDto:GetTaskDto){
    const {id}=getTaskDto
    return await this.tasksService.findOne(id)
  }
  @Put(':id')
  async updateTask(@Param('id') id:number,@Body() updateTaskDto:UpdateTaskDto){
    return await this.tasksService.update(id,updateTaskDto)
  }
  @Delete(':id')
  async deleteTask(@Param('id') id:number){
    await this.tasksService.remove(id)
    return {message:'Task deleted successfully'}
  }
  @Get()
  async getTasks() {
    const tasks = await this.tasksService.findAll();
    return tasks.map(task => ({
      id: task.id.toString(),
      name: task.name,
      description: task.description,
      date: task.dueDate,
      priority: task.priority,
      taskListName: task.list ? task.list.name : undefined,
      logs: task.logs ? task.logs.map(log => log.id.toString()) : []
    }));
  }
}