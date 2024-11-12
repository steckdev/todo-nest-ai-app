import { Injectable } from "@nestjs/common";
import { OpenAiProvider } from "./openai.provider";

@Injectable()
export class AiService {
	constructor(private readonly openAiProvider: OpenAiProvider) {}

	async generateTodoFromPrompt(prompt: string): Promise<string[]> {
		const rawResponse = await this.openAiProvider.getResponse(prompt);
		return this.extractTodoItems(rawResponse);
	}

	private extractTodoItems(text: string): string[] {
		return text
			.split("\n")
			.map((item) => item.trim()) // Remove leading/trailing whitespace from each line
			.map((item) => item.replace(/^\d+\.\s*/, "")) // Remove leading numbering with period and whitespace (e.g., "1. ")
			.map((item) => item.replace(/\s{2,}/g, " ")) // Collapse multiple spaces into a single space
			.map((item) => item.replace(/\.$/, "")) // Remove any trailing period
			.map((item) => item.replace(/^- /, "")) // Remove leading dash and space
			.map((item) => item.trim()) // Final trim for any residual whitespace
			.filter((item) => item.length > 0) // Remove empty strings
			.filter((item) => item.includes(":")); // Remove lines that don't include a colon
	}
}
