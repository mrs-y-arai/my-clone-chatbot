"use client";

import { useState } from "react";
import {
  Button,
  Textarea,
  Box,
  Title,
  Text,
  Tabs,
  FileInput,
} from "@mantine/core";

export default function Home() {
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
    <div>
      <Title ta="center" order={1} fz="h2" mb="md">
        AIにデータを登録する
      </Title>
      <Text mb="md">
        データを入力して送信すると、AIにデータを登録することができます。登録したデータはAIの知識として活用され、より自然でスムーズな会話が可能になります。
      </Text>

      <Tabs defaultValue="text">
        <Tabs.List>
          <Tabs.Tab value="text">テキスト登録</Tabs.Tab>
          <Tabs.Tab value="pdf">PDF登録</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="text">
          <form onSubmit={handleTextSubmit}>
            <Box
              display="flex"
              style={{ gap: "12px", flexDirection: "column" }}
              mt="md"
            >
              <Textarea
                label="登録する知識"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="テキストを入力してください"
                required
              />
              <Button w="fit-content" mx="auto" type="submit">
                登録する
              </Button>
            </Box>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="pdf">
          <form onSubmit={handleFileSubmit}>
            <Box
              display="flex"
              style={{ gap: "12px", flexDirection: "column" }}
              mt="md"
            >
              <FileInput
                label="PDFファイル"
                placeholder="PDFファイルを選択してください"
                accept="application/pdf"
                value={file}
                onChange={setFile}
                required
              />
              <Button w="fit-content" mx="auto" type="submit">
                登録する
              </Button>
            </Box>
          </form>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
