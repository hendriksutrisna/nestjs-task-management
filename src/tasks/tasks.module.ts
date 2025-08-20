import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Register the Task with TypeORM
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
