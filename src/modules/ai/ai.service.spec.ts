import { Test, type TestingModule } from "@nestjs/testing";
import { type MockProxy, mock } from "jest-mock-extended";
import { AiService } from "./ai.service";
import { OpenAiProvider } from "./openai.provider";

describe("AiService", () => {
	let service: AiService;
	let mockOpenAiProvider: MockProxy<OpenAiProvider>;

	beforeEach(async () => {
		mockOpenAiProvider = mock<OpenAiProvider>();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AiService,
				{
					provide: OpenAiProvider,
					useValue: mockOpenAiProvider,
				},
			],
		}).compile();

		service = module.get<AiService>(AiService);
	});

	describe("generateTodoFromPrompt", () => {
		let mockResponseText: string;

		describe("when the prompt includes multiple tasks with different categories", () => {
			beforeEach(() => {
				mockResponseText = `
          MEETING: Prepare for the meeting.
          CALL: Call John.
          SHOP: Buy groceries.
          APPT: Set up a dentist appointment.
        `;
				mockOpenAiProvider.getResponse.mockResolvedValue(mockResponseText);
			});

			it("should return a list of categorized tasks", async () => {
				const prompt =
					"Prepare for the meeting, call John, buy groceries, and set up a dentist appointment.";
				const result = await service.generateTodoFromPrompt(prompt);

				expect(result).toEqual([
					"MEETING: Prepare for the meeting",
					"CALL: Call John",
					"SHOP: Buy groceries",
					"APPT: Set up a dentist appointment",
				]);
			});
		});

		describe("when the response text contains periods at the end of tasks", () => {
			beforeEach(() => {
				mockResponseText = `
          TASK: Complete the assignment.
          CALL: Call the client.
          MEETING: Attend project review.
        `;
				mockOpenAiProvider.getResponse.mockResolvedValue(mockResponseText);
			});

			it("should remove trailing periods from each task", async () => {
				const prompt =
					"Complete the assignment, call the client, and attend the project review meeting.";
				const result = await service.generateTodoFromPrompt(prompt);

				expect(result).toEqual([
					"TASK: Complete the assignment",
					"CALL: Call the client",
					"MEETING: Attend project review",
				]);
			});
		});

		describe("when the response text has mixed formatting and extra whitespace", () => {
			beforeEach(() => {
				mockResponseText = `
          TASK:   Finish the project.
            CALL:   Contact the vendor
          MEETING: Schedule a team review.
        `;
				mockOpenAiProvider.getResponse.mockResolvedValue(mockResponseText);
			});

			it("should trim extra whitespace from each task", async () => {
				const prompt =
					"Finish the project, contact the vendor, and schedule a team review.";
				const result = await service.generateTodoFromPrompt(prompt);

				expect(result).toEqual([
					"TASK: Finish the project",
					"CALL: Contact the vendor",
					"MEETING: Schedule a team review",
				]);
			});
		});

		describe('when the response text includes improperly formatted lines with random "Response:" prefix', () => {
			beforeEach(() => {
				mockResponseText = `
          Response: TASK: Acceptable task.
          CALL: Follow up with client.
        `;
				mockOpenAiProvider.getResponse.mockResolvedValue(mockResponseText);
			});

			it('should ignore lines without the ":" in the response', async () => {
				const prompt = "Send the email and follow up with the client.";
				const result = await service.generateTodoFromPrompt(prompt);

				expect(result).toEqual([
					"TASK: Acceptable task",
					"CALL: Follow up with client",
				]);
			});
		});

		describe("when the response text is empty", () => {
			beforeEach(() => {
				mockResponseText = "";
				mockOpenAiProvider.getResponse.mockResolvedValue(mockResponseText);
			});

			it("should return an empty array", async () => {
				const prompt = "";
				const result = await service.generateTodoFromPrompt(prompt);

				expect(result).toEqual([]);
			});
		});
	});
});
