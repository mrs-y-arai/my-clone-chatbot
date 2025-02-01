"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, Save } from "lucide-react";

export default function KnowledgePage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      setText("");
      alert("送信しました！");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/embeddings/pdf", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      setFile(null);
      alert("送信しました！");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">AIの学習データ管理</h1>

      <div className="space-y-8">
        <form className="p-6 border rounded-lg" onSubmit={handleTextSubmit}>
          <h2 className="text-xl font-semibold mb-4">テキストの登録</h2>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="AIに覚えさせたい情報を入力してください..."
            className="min-h-[200px] mb-4"
          />
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            テキストを保存
          </Button>
        </form>

        <form className="p-6 border rounded-lg" onSubmit={handleFileSubmit}>
          <h2 className="text-xl font-semibold mb-4">PDFファイルの登録</h2>
          <div className="space-y-4">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileSubmit}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="mx-auto h-8 w-8 mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  クリックしてPDFファイルを選択、またはここにドラッグ＆ドロップしてください
                </p>
              </div>
            </label>
          </div>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            ファイルを保存
          </Button>
        </form>
      </div>
    </div>
  );
}
