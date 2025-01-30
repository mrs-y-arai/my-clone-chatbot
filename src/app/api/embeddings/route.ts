import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { Database } from "~/../../supabase/database.types";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getEmbedding(text: string) {
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return embeddings.data[0].embedding;
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const embedding = await getEmbedding(text);
    await supabase.from("embeddings").insert({
      content: text,
      embedding: JSON.stringify(embedding),
    });

    return NextResponse.json(
      {
        message: "OK",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
