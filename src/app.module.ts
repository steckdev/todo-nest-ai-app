import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./modules/todo/todo.module";
import { AiModule } from "./modules/ai/ai.module";

@Module({
	imports: [TodoModule, AiModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
