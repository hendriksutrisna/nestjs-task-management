import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid, UUIDTypes } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((item) => item.status === status);
    }
    if (search) {
      tasks = tasks.filter((item) => {
        if (item.title.includes(search) || item.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException('Task with ID "${id}" not found');
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const foundTask = this.getTaskById(id);
    foundTask.status = status;
    return foundTask;
  }
}
