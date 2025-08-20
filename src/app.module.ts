import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'task-management',
      username: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
    }), 
  ],
})
export class AppModule {}
