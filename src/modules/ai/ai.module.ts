import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OpenAiProvider } from './openai.provider';

@Module({
  providers: [AiService, OpenAiProvider],
  exports: [AiService],
})
export class AiModule {}
