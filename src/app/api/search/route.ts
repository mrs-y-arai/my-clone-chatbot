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

    const { data, error } = await supabase.rpc("match_embeddings", {
      query_embedding: JSON.stringify(embedding),
      match_threshold: 0.3,
      match_count: 10,
    });

    if (error) throw new Error(`検索に失敗しました: ${error.message}`);

    return NextResponse.json(
      {
        message: "OK",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
