import { TodoService } from './todo.service';
import { CreateTodoDto, Todo, UpdateTodoDto } from './todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  @Get()
  public findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  @Post()
  public create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
  })
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): { title: string; description: string; id: string } {
    return this.todoService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully deleted.',
  })
  @Delete(':id')
  public remove(@Param('id') id: string): Todo {
    return this.todoService.remove(id);
  }

  @ApiOperation({ summary: 'Generate todos from an OpenAI prompt' })
  @ApiResponse({
    status: 201,
    description: 'The todos have been successfully generated.',
    type: [Todo],
  })
  @Post('generate')
  public async generateTodoFromPrompt(
    @Query('prompt') prompt: string,
  ): Promise<Todo[]> {
    return this.todoService.generateTodoFromPrompt(prompt);
  }
}
