/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto{
	@ApiProperty({ description: 'Name of the task' })
  name: string;

  @ApiProperty({ description: 'Optional description of the task', required: false })
  description?: string;

  @ApiProperty({ description: 'Due date of the task' })
  dueDate: Date;

  @ApiProperty({ description: 'Priority of the task (High, Medium, Low)' })
  priority: string;

  @ApiProperty({ description: 'ID of the task list the task belongs to' })
  listId: number;
}
export class UpdateTaskDto {
  @ApiProperty({ description: 'ID of the task' })
  id: number;

  @ApiProperty({ description: 'Name of the task' })
  name?: string;

  @ApiProperty({ description: 'Optional description of the task', required: false })
  description?: string;

  @ApiProperty({ description: 'Due date of the task' })
  dueDate?: Date;

  @ApiProperty({ description: 'Priority of the task (High, Medium, Low)' })
  priority?: string;

  @ApiProperty({ description: 'ID of the task list the task belongs to' })
  listId?: number;
}

export class GetTaskDto {
  @ApiProperty({ description: 'ID of the task to retrieve' })
  id: number;
}