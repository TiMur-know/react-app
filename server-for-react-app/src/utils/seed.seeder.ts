/* eslint-disable prettier/prettier */
/*import { Injectable } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Log } from 'src/entity/Log.entity';
import { Task } from 'src/entity/Task.entity';
import { TaskList } from 'src/entity/TaskList.entity';

// Import your Entities


@Injectable()
export class DatabaseSeeder implements Seeder {
  async run(factory: Factory): Promise<any> {
    const taskLists = await factory(TaskList)().createMany(10);

    await Promise.all(
      taskLists.map(async (taskList) => {
        const tasks = await factory(Task)({ list: taskList }).createMany(5);
        taskList.tasks = tasks;

        await factory(Log)({ tasks: tasks }).createMany(3);
      })
    );
  }
}*/