import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, Todo, UpdateTodoDto } from './todo.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  constructor(private readonly aiService: AiService) {}

  findAll() {
    return this.todos;
  }

  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: (this.todos.length + 1).toString(),
      title: createTodoDto.title,
      description: createTodoDto.description,
      progress: createTodoDto.progress,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo not found');
    }
    const updatedTodo = { ...this.todos[todoIndex], ...updateTodoDto };
    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo not found');
    }
    const removedTodo = this.todos.splice(todoIndex, 1);
    return removedTodo[0];
  }

  async generateTodoFromPrompt(prompt: string): Promise<Todo[]> {
    const generatedTexts = await this.aiService.generateTodoFromPrompt(prompt);
    const newTodos: Todo[] = generatedTexts.map((text, index) => {
      return {
        id: (this.todos.length + index + 1).toString(),
        title: text,
        description: '',
        progress: 0,
      };
    });
    this.todos.push(...newTodos);
    return newTodos;
  }
}
