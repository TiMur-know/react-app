/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty({ description: 'Message describing the activity' })
  message: string;

  @ApiProperty({ description: 'Optional array of primary words related to the activity', required: false })
  primaryWords?: string[];

  @ApiProperty({ description: 'Optional array of secondary words related to the activity', required: false })
  secondaryWords?: string[];

  @ApiProperty({ description: 'Optional list of task IDs associated with the log' })
  taskIds?: number[];
}

export class GetLogDto {
  @ApiProperty({ description: 'ID of the log to retrieve' })
  id: number;
}