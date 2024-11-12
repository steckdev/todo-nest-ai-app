import { Module } from "@nestjs/common";
import { AiModule } from "../ai/ai.module";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
	imports: [AiModule],
	controllers: [TodoController],
	providers: [TodoService],
})
export class TodoModule {}
