// lib
import {
  Body,
  Controller,
  UseGuards,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
// service
import { TodosService } from '@/todos/todos.service'
// dto
import { TodoDto, CreateTodoDto, UpdateTodoDto } from '@/todos/dto/todo.dto'
// guard
import { AuthGuard } from '@/auth/auth.guard'

@Controller({ version: ['1'], path: 'todos' })
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodoList() {
    return this.todosService.getTodoList()
  }

  @Get('/user/:uid')
  getUsersTodos(@Param('uid') uid: string) {
    return this.todosService.getUsersTodos(uid)
  }

  @Post()
  createTodo(@Body() payloadTodo: CreateTodoDto) {
    const todo = plainToInstance(TodoDto, payloadTodo)
    return this.todosService.createTodo({
      userId: todo.userId,
      title: todo.title,
      description: todo.description
    })
  }

  @Put()
  updateTodo(@Body() payloadTodo: UpdateTodoDto) {
    const todo = plainToInstance(TodoDto, payloadTodo)
    return this.todosService.updateTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isComplete: todo.isComplete
    })
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id)
  }
}
