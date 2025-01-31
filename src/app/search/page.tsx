"use client";

import { useState } from "react";
import {
  Title,
  TextInput,
  Button,
  Stack,
  Paper,
  Text,
  Box,
  List,
} from "@mantine/core";

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
    <Stack>
      <Title ta="center" order={1} fz="h2" mb="md">
        ナレッジ検索
      </Title>

      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          style={{ gap: "12px", flexDirection: "column" }}
          mt="md"
        >
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください"
            label="検索するテキスト"
            required
          />
          <Button type="submit" w="fit-content" mx="auto">
            検索する
          </Button>
        </Box>
      </form>

      <Box mt="xl">
        <Title order={3} size="h4" ta="center" mb="md">
          検索結果
        </Title>
        <List spacing="md" center>
          {result?.map((item) => (
            <List.Item key={item.id}>
              <Paper p="md">
                <Text>{item.content}</Text>
                <Text size="sm" c="dimmed" mt="xs">
                  類似度: {(item.similarity * 100).toFixed(2)}%
                </Text>
              </Paper>
            </List.Item>
          ))}
        </List>
      </Box>
    </Stack>
  );
}
