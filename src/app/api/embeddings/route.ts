import { NextResponse } from "next/server";
import { createSupabase } from "@/libs/supabase";
import { getEmbedding } from "@/utils/getEmbedding";

const supabase = createSupabase();

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
