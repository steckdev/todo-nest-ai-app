import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, Max, IsString, IsOptional } from "class-validator";

export class CreateTodoDto {
	@ApiProperty({ example: "Buy groceries" })
	@IsString()
	title: string;

	@ApiProperty({ example: "Milk, Bread, Eggs", default: "" })
	@IsString()
	@IsOptional()
	description = "";

	@ApiProperty({
		example: 0,
		description: "Progress of the todo item in percentage",
	})
	@IsInt()
	@Min(0)
	@Max(100)
	progress: number;
}

export class UpdateTodoDto {
	@ApiProperty({ example: "Buy groceries" })
	@IsString()
	@IsOptional()
	title?: string;

	@ApiProperty({ example: "Milk, Bread, Eggs", default: "" })
	@IsString()
	@IsOptional()
	description?: string = "";

	@ApiProperty({
		example: 0,
		description: "Progress of the todo item in percentage",
	})
	@IsInt()
	@Min(0)
	@Max(100)
	@IsOptional()
	progress?: number;
}

export class Todo {
	@ApiProperty({ example: "1" })
	id: string;

	@ApiProperty({ example: "Buy groceries" })
	title: string;

	@ApiProperty({ example: "Milk, Bread, Eggs", default: "" })
	description = "";

	@ApiProperty({
		example: 0,
		description: "Progress of the todo item in percentage",
	})
	@IsInt()
	@Min(0)
	@Max(100)
	progress: number;
}
