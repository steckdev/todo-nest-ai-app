import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { AppModule } from "./app.module";

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	app.enableCors();

	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	// Swagger setup
	const config = new DocumentBuilder()
		.setTitle("Todo API")
		.setDescription("The Todo API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT ?? 3000);

	// biome-ignore lint/suspicious/noConsoleLog: Startup message
	console.log(
		`Application is running on: ${await app.getUrl()}\nSwagger api doc is running on: ${await app.getUrl()}/api`,
	);
}
bootstrap();
