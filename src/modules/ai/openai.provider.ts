import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

@Injectable()
export class OpenAiProvider {
	private openai: OpenAI;
	private model: string;

	constructor() {
		const configuration = {
			apiKey: process.env.OPENAI_API_KEY,
		};
		this.openai = new OpenAI(configuration);
		this.model = process.env.OPENAI_MODEL;
	}

	async getResponse(prompt: string): Promise<string> {
		const response = await this.openai.chat.completions.create({
			model: this.model,
			messages: this.buildPromptMessages(prompt),
		});

		return response.choices[0].message.content;
	}

	private buildPromptMessages(prompt: string): ChatCompletionMessageParam[] {
		return [
			{
				role: "system",
				content: `You are a helpful assistant. Based on the user’s input, generate a list of tasks with an uppercase category prefix for each item. Each task should follow this format:

        Response: CATEGORY: Task description.

        Use an appropriate uppercase word (like a tag) that categorizes each task. The categories should be clear, concise, and directly relevant to each task.`,
			},
			{
				role: "user",
				content: prompt,
			},
		];
	}
}
