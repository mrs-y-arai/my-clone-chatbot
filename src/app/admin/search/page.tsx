"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">学習データの検索</h1>

      <form className="flex gap-4 mb-8" onSubmit={handleSubmit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="登録済みの情報を検索..."
          className="flex-1"
        />
        <Button type="submit">
          <SearchIcon className="mr-2 h-4 w-4" />
          検索
        </Button>
      </form>

      {result && result.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">検索結果</h2>
          <div className="space-y-4">
            {result.map((result, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <p>{result.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
