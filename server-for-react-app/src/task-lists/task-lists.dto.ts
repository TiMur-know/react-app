/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskListDto {
  @ApiProperty({ description: 'Name of the task list' })
  name: string;
}

export class GetTaskListDto {
  @ApiProperty({ description: 'ID of the task list to retrieve' })
  id: number;
}

export class UpdateTaskListDto {
  @ApiProperty({ description: 'ID of the task list to update' })
  id: number;

  @ApiProperty({ description: 'Optional new name for the task list' })
  name?: string;
}