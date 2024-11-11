import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { AiService } from '../ai/ai.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let aiService: MockProxy<AiService>;

  beforeEach(async () => {
    aiService = mock<AiService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, { provide: AiService, useValue: aiService }],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should create a new todo', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test',
      description: 'Test desc',
      progress: 0,
    };
    const todo = service.create(createTodoDto);
    expect(todo).toEqual(expect.objectContaining(createTodoDto));
  });

  it('should update an existing todo', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test',
      description: 'Test desc',
      progress: 0,
    };
    const todo = service.create(createTodoDto);
    const updateTodoDto: UpdateTodoDto = { title: 'Updated Test' };
    const updatedTodo = service.update(todo.id, updateTodoDto);
    expect(updatedTodo.title).toBe(updateTodoDto.title);
  });

  it('should throw NotFoundException when updating non-existing todo', () => {
    const updateTodoDto: UpdateTodoDto = { title: 'Updated Test' };
    expect(() => service.update('non-existing-id', updateTodoDto)).toThrow(
      NotFoundException,
    );
  });

  it('should remove an existing todo', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test',
      description: 'Test desc',
      progress: 0,
    };
    const todo = service.create(createTodoDto);
    const removedTodo = service.remove(todo.id);
    expect(removedTodo).toEqual(todo);
  });

  it('should throw NotFoundException when removing non-existing todo', () => {
    expect(() => service.remove('non-existing-id')).toThrow(NotFoundException);
  });

  it('should generate todos from prompt', async () => {
    aiService.generateTodoFromPrompt.mockResolvedValue(['TASK 1', 'TASK 2']);
    const todos = await service.generateTodoFromPrompt('Generate tasks');
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe('TASK 1');
    expect(todos[1].title).toBe('TASK 2');
  });
});
