import { NextResponse } from "next/server";
import { getEmbedding } from "@/utils/getEmbedding";
import { createSupabase } from "@/libs/supabase";

const supabase = createSupabase();

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
