import { createOpenAI } from "@/libs/openai";

const openai = createOpenAI();

export async function getEmbedding(text: string) {
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  return embeddings.data[0].embedding;
}
