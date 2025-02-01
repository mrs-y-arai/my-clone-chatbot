import { NextResponse } from "next/server";
import { getEmbedding } from "@/utils/getEmbedding";
import { createSupabase } from "@/libs/supabase";
import { createOpenAI } from "@/libs/openai";
import { CHAT_DEFAULT_MODEL } from "@/constants/GptModel";
import { z } from "zod";

const messageSchema = z.object({
  message: z.string(),
});

const supabase = createSupabase();
const openAi = createOpenAI();

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const embedding = await getEmbedding(message);
    const { data, error } = await supabase.rpc("match_embeddings", {
      query_embedding: JSON.stringify(embedding),
      match_threshold: 0.2,
      match_count: 10,
    });
    console.log("matchEmbeddings data", data);
    console.log("matchEmbeddings error", error);
    const knowledge = data?.map((item) => item.content).join("\n");
    console.log("knowledge", knowledge);

    const response = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `あなたは、「荒井 勇己」という名前のフロントエンドエンジニアです。
          ユーザーからの質問に対して、回答してください。回答内容は、documentsを参考にして考えてください。
          documentsが無い場合、documentsの内容を無視して回答してください。
          レスポンスの形式は必ず守ってください。
          ユーザーからの質問の形式: { message: {ユーザーからのメッセージ}, documents: {添付されたdocuments} }
          期待されるJSONレスポンス: { message: string }
          補足:
          - あなたの名前: 荒井 勇己(読み: アライ ユウキ)
          - あなたの職業: フロントエンドエンジニア
          `,
        },
        {
          role: "user",
          content: `message: ${message}
          documents: ${knowledge ?? "無し"}`,
        },
      ],
      model: CHAT_DEFAULT_MODEL,
      response_format: {
        type: "json_object",
      },
    });

    console.log("response", JSON.parse(response.choices[0].message.content!));

    const parsedMessage = messageSchema.safeParse(
      response.choices[0].message.content
        ? JSON.parse(response.choices[0].message.content)
        : {
            message: "",
          }
    );
    console.log("parsedMessage", parsedMessage.error?.errors);

    if (!parsedMessage.success) {
      return NextResponse.json(
        {
          message: "JSONのパースに失敗しました",
          data: {
            message: parsedMessage.error.message,
          },
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        data: {
          message: parsedMessage.data.message,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);

    return NextResponse.json(
      {
        message: "ERROR",
      },
      { status: 500 }
    );
  }
}
