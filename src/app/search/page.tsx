"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<
    | {
        id: string;
        content: string;
        similarity: number;
      }[]
    | null
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      const result = await res.json();
      setText("");
      setResult(result.data);
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>ナレッジ検索</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-10">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください"
            required
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            検索
          </button>
        </div>
      </form>
      <div>
        <p>検索結果</p>
        {result?.map((item) => (
          <div key={item.id}>
            <p>{item.content}</p>
            <p>{item.similarity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
