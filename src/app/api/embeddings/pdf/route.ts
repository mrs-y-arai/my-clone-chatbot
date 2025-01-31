import { NextResponse } from "next/server";
import { loadPdf } from "@/utils/loadPdf";
import { getEmbedding } from "@/utils/getEmbedding";
import { createSupabase } from "@/libs/supabase";

const supabase = createSupabase();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "ファイルがありません" },
        { status: 400 }
      );
    }

    // ファイルを読み込んで、チャンクに分割
    const splitDocs = await loadPdf(file);

    // ベクトル化
    const embeddings = await Promise.all(
      splitDocs.map(async (item) => {
        const embedding = await getEmbedding(item.pageContent);
        return {
          content: item.pageContent,
          embedding,
        };
      })
    );

    // DBに保存
    await Promise.all(
      embeddings.map(async (item) => {
        await supabase.from("embeddings").insert({
          content: item.content,
          embedding: JSON.stringify(item.embedding),
        });
      })
    );

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
