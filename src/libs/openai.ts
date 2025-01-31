import OpenAI from "openai";

export function createOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });
}
